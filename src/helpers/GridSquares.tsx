import React, { useEffect } from 'react';
import * as THREE from 'three';
import { AxesHelper } from 'three';
import { useThree } from '@react-three/fiber';

export const GridSquares = ({ size = 10 }) => {
  const tiles = [];

  for (let x = -size / 2; x < size / 2; x++) {
    for (let z = -size / 2; z < size / 2; z++) {
      const color = (x + z) % 2 === 0 ? 'gray' : 'darkgray';
      tiles.push(
        <mesh key={`tile-${x}-${z}`} position={[x + 0.5, 0, z + 0.5]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>,
      );
    }
  }

  return <group rotation={[-Math.PI / 2, 0, 0]}>{tiles}</group>;
};

export const Axis = ({ size = 1 }) => {
  const { scene, camera } = useThree();
  useEffect(() => {
    const axes = new AxesHelper(size);
    // const cameraHelper = new CameraHelper(camera);
    // scene.add(cameraHelper);
    scene.add(axes);
    return () => {
      scene.remove(axes);
      // scene.remove(cameraHelper);
    };
  }, [scene, camera, size]);
  return null;
};
