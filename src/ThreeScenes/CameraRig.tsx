import { useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Vector3, CatmullRomCurve3 } from 'three';

// const keyframes = [
//     { position: [-2.5, 0.5, 1.6] },
//     { position: [0.684, 1.4, 3.5] },
//     { position: [2.5, 1.5, 2] },
//     { position: [3, 1, -2] },
//     { position: [-1, 0.8, -3.7] },
//     { position: [-1, 1.2, -1] },
//     { position: [-1, 1.4, 1] },
// ]

const keyFrames = [
  { position: [-2.5, 0.5, 1.6] },
  { position: [0.684, 1, 3.5] },
  { position: [2.5, 1.5, 2] },
  { position: [1.5, 1, -2] },
  { position: [-1.5, 0.7, -1.8] },
];

// Custom camera controller to follow scroll
const CameraController = () => {
  // console.log('CameraController rendered with offset:', offset);
  const { camera } = useThree();
  const data = useScroll();

  const curve = useMemo(() => {
    try {
      const points = keyFrames.map((k) => new Vector3(...k.position));
      return new CatmullRomCurve3(points);
    } catch (error) {
      console.error('Error creating camera curve:', error);
      // Fallback curve with safe default positions
      return new CatmullRomCurve3([
        new Vector3(0, 1, 5),
        new Vector3(0, 1, 0),
        new Vector3(0, 1, -5),
      ]);
    }
  }, []);

  const target = new Vector3();
  useFrame(() => {
    // Safety checks to prevent undefined errors
    if (!data || data.offset === undefined || data.offset === null) {
      console.warn('ScrollData is undefined or invalid:', data);
      return;
    }

    // Additional safety check for camera
    if (!camera) {
      console.warn('Camera is undefined');
      return;
    }

    // Clamp the offset to valid range [0, 1]
    const safeOffset = Math.max(0, Math.min(1, data.offset));

    // if (offset !== undefined && offset !== null) {
    //     const clampedCustomOffset = Math.max(0, Math.min(1, offset));
    //     try {
    //         const point = curve.getPointAt(clampedCustomOffset);
    //         camera.position.lerp(point, 0.1);
    //     } catch (error) {
    //         console.error('Error getting point at custom offset:', error);
    //     }
    // }

    try {
      const point = curve.getPointAt(safeOffset);
      // console.log(point);
      camera.position.lerp(point, 0.1);

      // Optional: look ahead slightly to create natural motion
      const lookAheadOffset = Math.min(safeOffset + 0.01, 1);
      curve.getPointAt(lookAheadOffset, target);
      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error('Error in camera animation:', error);
    }
  });

  return null;
};

export { CameraController };
