import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface MilestoneData {
  year: string;
  title: string;
  description: string;
  position: number;
}

interface MilestoneMarkerProps {
  milestone: MilestoneData;
  position: [number, number, number];
}

// Custom hook to handle milestone visibility
function useMarkerVisibility(position: [number, number, number]) {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  useFrame(({ camera }) => {
    // Calculate distance from camera to milestone
    const cameraPos = camera.position.clone();
    const markerPos = new THREE.Vector3(position[0], position[1], position[2]);
    const distance = cameraPos.distanceTo(markerPos);

    // Calculate direction to see if we've passed the milestone
    const cameraDirection = camera.getWorldDirection(new THREE.Vector3());
    const toMarker = markerPos.clone().sub(cameraPos).normalize();
    const dotProduct = cameraDirection.dot(toMarker);

    // Handle visibility based on distance
    if ((distance < 2.75) && visible && !isFadingOut) {
      // Start fadeout animation
      setIsFadingOut(true);

      // Remove element after animation completes
      setTimeout(() => {
        setVisible(false);
      }, 500); // Match animation duration
    } else if (dotProduct < 0.5 && dotProduct > -0.5) {
      setVisible(false);
      setIsFadingOut(false);
    } else if (distance >= 2.75 && !visible) {
      // Show again when far enough away
      setVisible(true);
      setIsFadingOut(false);
    }
  });
  
  return { visible, isFadingOut };
}

export default function MilestoneMarker({
  milestone,
  position,
}: MilestoneMarkerProps) {
  // Reference for billboard rotation
  const groupRef = useRef<THREE.Group>(null);
  
  // Use custom hook for visibility logic
  const { visible, isFadingOut } = useMarkerVisibility(position);

  // Make the milestone marker face the camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Make the marker face the camera
      groupRef.current.quaternion.copy(camera.quaternion);
    }
  });

  // Don't render anything if not visible
  if (!visible && !isFadingOut) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* The milestone information box with animation classes */}
      <Html position={[0, 0, 0]} center distanceFactor={10}>
        <div
          className={`thought-bubble bg-primary text-primary p-3 rounded-xl shadow-lg w-64 ${
            isFadingOut ? "fadeout" : ""
          }`}
        >
          <div className="mb-1">
            <span className="text-sm font-bold text-burnt-amber block">
              {milestone.year}
            </span>
            <h3 className="font-bold text-lg">{milestone.title}</h3>
          </div>
          <p className="text-sm">{milestone.description}</p>
        </div>
      </Html>
    </group>
  );
}
