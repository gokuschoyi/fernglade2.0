import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { animated, useSpring } from '@react-spring/three';
import useScrollProgress from '../helpers/ScrollProgress';

// Line path: [start] → [left] → [up]
// const linePoints = [
//     [0, 0, 0],    // Start
//     [-0.5, 0, 0],   // Left
//     [-0.5, 0.5, 0]    // Up
// ]

const generateLineGeometry = (lineHeight: number) => {
  return [
    new THREE.Vector3(0, 0, 0), // Start
    new THREE.Vector3(-0.5, 0, 0), // Left
    new THREE.Vector3(-0.5, lineHeight, 0), // Up
  ];
};

const AnimatedLine = ({ progress, lineHeight }: { progress: number; lineHeight: number }) => {
  const ref = useRef<THREE.BufferGeometry | null>(null);

  // Memoize the curve
  const curve = useMemo(() => {
    const linePoints = generateLineGeometry(lineHeight);
    // console.log('linePoints', linePoints)
    const points = linePoints.map((p) => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(points, false, 'chordal', 0.1); // You can also use LineCurve3 if it's straight
  }, [lineHeight]);

  useFrame(() => {
    if (ref.current) {
      const divisions = 100; // Number of points on the full curve

      // Calculate line progress: grows to 1 in first half, shrinks to 0 in second half
      let lineProgress;
      if (progress <= 0.5) {
        // First half: 0 to 1
        lineProgress = progress * 2;
      } else {
        // Second half: 1 to 0
        lineProgress = 2 - progress * 2;
      }

      const currentLength = Math.floor(divisions * lineProgress);

      // Sample points along the curve up to the current progress
      const points = [];
      for (let i = 0; i <= currentLength; i++) {
        points.push(curve.getPoint(i / divisions));
      }

      ref.current.setFromPoints(points);
    }
  });

  return (
    <line>
      <bufferGeometry attach="geometry" ref={ref} />
      <lineBasicMaterial color="white" linewidth={2} />
    </line>
  );
};

export const TagBox = ({ progress, lineHeight }: { progress: number; lineHeight: number }) => {
  const texture = useLoader(TextureLoader, '/public/img1.jpg'); // use more for carousel

  // Calculate visibility with a dead zone in the middle
  let imageOpacity;
  let imageScale;

  if (progress <= 0.4) {
    // First phase: fade in from 0.3 to 0.4 (10% range)
    if (progress < 0.3) {
      imageOpacity = 0;
      imageScale = 0.5;
    } else {
      const fadeInProgress = (progress - 0.3) / 0.2; // 0 to 1 over 10% range
      imageOpacity = fadeInProgress;
      imageScale = 0.5 + 0.5 * fadeInProgress;
    }
  } else if (progress <= 0.6) {
    // Dead zone: fully visible from 0.4 to 0.6 (20% range - about 10% on each side of center)
    imageOpacity = 1;
    imageScale = 1;
  } else {
    // Final phase: fade out from 0.6 to 0.7 (10% range)
    if (progress > 0.7) {
      imageOpacity = 0;
      imageScale = 0.5;
    } else {
      const fadeOutProgress = (progress - 0.6) / 0.1; // 0 to 1 over 10% range
      imageOpacity = 1 - fadeOutProgress;
      imageScale = 1 - 0.5 * fadeOutProgress;
    }
  }

  const { opacity, scale } = useSpring({
    opacity: imageOpacity,
    scale: imageScale,
    config: { tension: 120, friction: 20 },
  });

  // Position the image at the end of the line (x: -0.5, y: lineHeight) plus a small offset above
  const imagePosition: [number, number, number] = [-0.5, lineHeight + 0.6, 0];

  return (
    <animated.mesh position={imagePosition} scale={scale}>
      <planeGeometry args={[2, 1]} />
      <animated.meshBasicMaterial transparent opacity={opacity} map={texture} toneMapped={false} />
    </animated.mesh>
  );
};

type TagProps = {
  type: string; // 'image' or 'text'
  range_low: number;
  range_high: number;
  position?: THREE.Vector3; // Only used for text tags
  lineHeight: number; // Optional, used for text tags
};

const Tag = ({ type, range_low, range_high, position, lineHeight }: TagProps) => {
  const progress = useScrollProgress(range_low, range_high);

  if (type === 'image') {
    return (
      <group position={position}>
        <AnimatedLine progress={progress} lineHeight={lineHeight} />
        <TagBox progress={progress} lineHeight={lineHeight} />
      </group>
    );
  }

  if (type === 'text') {
    return (
      <group position={position}>
        <AnimatedLine progress={progress} lineHeight={lineHeight} />
      </group>
    );
  }

  return null;
};

export default Tag;
