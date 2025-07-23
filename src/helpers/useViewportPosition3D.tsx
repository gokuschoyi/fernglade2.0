import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Returns a 3D position that corresponds to a point on the screen.
 * @param xPercent 0 to 1, from left to right (0.5 = center)
 * @param yPercent 0 to 1, from bottom to top (0.5 = center)
 * @param zDepth Distance from the camera in world units (default = -5)
 */
export function useViewportPosition3D(
  xPercent: number,
  yPercent: number,
  zDepth = -5,
): THREE.Vector3 {
  const { camera, size } = useThree();
  console.log('size:', size);
  return useMemo(() => {
    const x = (xPercent - 0.5) * size.width; // Center at 0.5
    const y = (0.5 - yPercent) * size.height; // Invert y-axis (0 at top, 1 at bottom)
    const z = zDepth;
    console.log('Viewport position:', { x, y, z });
    const ndc = new THREE.Vector3(x, y, z);
    ndc.unproject(camera);

    return ndc;
  }, [xPercent, yPercent, zDepth, camera, size]);
}
