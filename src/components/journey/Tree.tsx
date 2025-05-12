import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface TreeProps {
  position: [number, number, number];
  treeType: string;
  scale?: number;
  flip?: boolean;
}

export default function Tree({
  position,
  treeType,
  scale = 2,
  flip = false,
}: TreeProps) {
  // Load the tree image as a texture
  const texture = useTexture(`/${treeType}`);

  // Create a material using the texture - memoized to prevent recreation
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  // Reference to the mesh to update its rotation
  const meshRef = useRef<THREE.Mesh>(null);

  // Use frame to update the rotation every frame
  useFrame(({ camera }) => {
    if (meshRef.current) {
      // Make the tree face the camera by copying the camera's quaternion
      meshRef.current.quaternion.copy(camera.quaternion);

      // If we need to flip, apply a Y-axis rotation of 180 degrees
      if (flip) {
        meshRef.current.rotation.y += Math.PI;
      }
    }
  });

  return (
    <group position={position}>
      {/* Use the ref to access the mesh for rotation updates */}
      <mesh ref={meshRef} material={material} scale={[scale, scale, scale]}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    </group>
  );
}
