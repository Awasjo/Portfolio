import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Tree from "./Tree";
import MilestoneMarker from "./MilestoneMarker";
import {
  milestones,
  roadPath,
  createUnifiedCurve,
} from "../../data/journeyData";

interface SceneProps {
  progress: number;
  setActiveMilestone: (index: number) => void;
}

// Define interface for tree objects
interface TreeItem {
  position: [number, number, number];
  type: string;
  flip: boolean;
  treeId: string;
}

// Define interface for road segment objects
interface RoadSegment {
  start: { x: number; z: number; curve: string };
  end: { x: number; z: number; curve: string };
  curveType: string;
}

// Helper function to set up camera position and look target
function setupCameraView(
  camera: THREE.Camera,
  position: THREE.Vector3, 
  tangent: THREE.Vector3,
  verticalOffset: THREE.Vector3 = new THREE.Vector3(0, 2, 0),
  chaseDistance: number = -3
): void {
  const chaseOffset = tangent.clone().multiplyScalar(chaseDistance);
  const cameraPos = position.clone().add(verticalOffset).add(chaseOffset);
  
  // Set camera position
  camera.position.copy(cameraPos);
  
  // Set look target
  const lookTarget = position.clone().add(verticalOffset).add(tangent);
  camera.lookAt(lookTarget);
}

export default function Scene({ progress, setActiveMilestone }: SceneProps) {
  // Get access to the Three.js camera and scene
  const { camera, scene } = useThree();
  
  // Set the scene background to blue for a full-sky effect
  useEffect(() => {
    scene.background = new THREE.Color("#87CEEB");
  }, [scene]);

  // Create refs to store references to objects we need to manipulate
  const groupRef = useRef<THREE.Group>(null);

  // Create a unified curve from all roadPath points
  const unifiedCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  if (!unifiedCurveRef.current) {
    unifiedCurveRef.current = createUnifiedCurve();
  }
  const unifiedCurve = unifiedCurveRef.current;

  // Initialize camera to the correct starting position
  useEffect(() => {
    const initialPos = unifiedCurve.getPoint(0);
    const initialTangent = unifiedCurve.getTangent(0);
    setupCameraView(camera, initialPos, initialTangent);
  }, [camera, unifiedCurve]);

  // Generate landscape elements (trees and milestones)
  const { trees, milestoneMarkers } = generateLandscape(unifiedCurve);

  // Update on each frame
  useFrame(() => {
    const pos = unifiedCurve.getPoint(progress);
    const tangent = unifiedCurve.getTangent(progress);
    const verticalOffset = new THREE.Vector3(0, 2, 0);

    // Get a position slightly behind our current position on the curve
    const chaseOffset = tangent.clone().multiplyScalar(-3);
    const targetCameraPos = pos.clone().add(verticalOffset).add(chaseOffset);

    // Smooth camera position using lerp (linear interpolation)
    camera.position.lerp(targetCameraPos, 0.05);

    // Create a look target that's ahead of our current position
    const lookTarget = pos.clone().add(verticalOffset).add(tangent);
    camera.lookAt(lookTarget);

    // Update milestone
    const activeMilestoneIndex = milestones.findIndex(
      (m) => Math.abs(m.position - progress) < 0.05
    );
    setActiveMilestone(activeMilestoneIndex);
  });

  // Return the complete 3D scene
  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -100]}>
        <planeGeometry args={[100, 300]} />
        <meshStandardMaterial color="#1a6f00" />
      </mesh>

      {/* Trees */}
      {trees.map((tree) => (
        <Tree
          key={tree.treeId}
          position={tree.position}
          treeType={tree.type}
          flip={tree.flip}
        />
      ))}

      {/* Milestone markers */}
      {milestoneMarkers.map((marker, index) => (
        <MilestoneMarker
          key={`milestone-${index}`}
          milestone={marker.milestone}
          position={marker.position}
        />
      ))}
    </group>
  );
}

// Helper function to generate landscape elements
function generateLandscape(unifiedCurve: THREE.CatmullRomCurve3) {
  // Define type of tree
  const treeType = "Tree1.png";

  // Create road segments based on our roadPath data
  const roadSegments: RoadSegment[] = [];
  for (let i = 0; i < roadPath.length - 1; i++) {
    roadSegments.push({
      start: roadPath[i],
      end: roadPath[i + 1],
      curveType: roadPath[i].curve,
    });
  }

  // Generate trees along the road
  const trees: TreeItem[] = [];
  const treesPerSegment = 8; // How many trees per road segment
  const treeDistance = 2; // How far from the road center to place trees

  // Create all trees
  roadSegments.forEach((segment, segmentIndex) => {
    for (let i = 0; i < treesPerSegment; i++) {
      // Calculate a position along this segment (0-1)
      const t = i / treesPerSegment;

      // Interpolate to find the exact road position
      const roadX = segment.start.x + (segment.end.x - segment.start.x) * t;
      const roadZ = segment.start.z + (segment.end.z - segment.start.z) * t;

      // Create trees on both sides of the road
      trees.push({
        position: [roadX - treeDistance, 0, roadZ],
        type: treeType,
        flip: true,
        treeId: `left-${segmentIndex}-${i}`,
      });

      trees.push({
        position: [roadX + treeDistance, 0, roadZ],
        type: treeType,
        flip: false,
        treeId: `right-${segmentIndex}-${i}`,
      });
    }
  });

  // Create centered milestone markers
  const milestoneMarkers = milestones.map((milestone) => {
    const position = unifiedCurve.getPoint(milestone.position);
    // Position the milestone in the center of the path at eye level
    return {
      milestone,
      position: [position.x, 1.5, position.z] as [number, number, number],
    };
  });
  
  return { trees, milestoneMarkers };
}
