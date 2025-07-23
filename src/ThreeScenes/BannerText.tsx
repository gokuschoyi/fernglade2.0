import React from 'react';
import { useScroll, Text3D, Center } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import type { Group } from 'three';
import { useControls } from 'leva';

const commonTextProps = {
  font: '/src/assets/Montserrat.json',
  height: 0.04, // Reduced height for smaller text
  curveSegments: 32,
  bevelEnabled: true,
  bevelThickness: 0.01, // Reduced bevel for smaller text
  bevelSize: 0.01, // Reduced bevel for smaller text
  bevelOffset: 0,
  bevelSegments: 4,
  anchorX: 'center' as const, // Centers each Text3D at its x-position
  anchorY: 'middle' as const, // Centers each Text3D at its y-position
  textAlign: 'center' as const, // Centers the text content within each Text3D
  maxWidth: 10, // Optional: set max width for better control
};

// Define your text lines (balanced for better centering)
const textLines = [
  '                Escape to Serenity         ',
  ' Discover the untouched beauty             ',
  '                   of Wayanad              ',
  '         Where nature whispers         ',
  '       and tranquility finds you       ',
];

const BannerText = () => {
  const scroll = useScroll();
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();
  const scaleFactor = 0.035; // tweak based on design

  // State to ensure proper size calculation on load
  const [isViewportReady, setIsViewportReady] = useState(false);
  const [calculatedSize, setCalculatedSize] = useState(0.5); // fallback size

  // Ensure viewport dimensions are properly set before calculating sizes
  useEffect(() => {
    if (viewport.width > 0 && viewport.height > 0) {
      const newSize = viewport.width * scaleFactor;
      setCalculatedSize(newSize);
      setIsViewportReady(true);
      console.log(
        'Viewport ready - Size calculated:',
        newSize,
        'Viewport:',
        viewport.width,
        'x',
        viewport.height,
      );
    }
  }, [viewport.width, viewport.height, scaleFactor]);
  // console.log(calculatedSize)
  // console.log('size', viewport.width * scaleFactor, viewport.height * scaleFactor)

  const group1Props = useControls('TG', {
    position: { value: [0, 1, 0], step: 0.01 },
    rotation: { value: [0, -1, 0], step: 0.01 },
    scale: { value: 1, min: 0.1, max: 3, step: 0.01 },
  });

  useFrame(() => {
    // Safety check for scroll data
    if (!scroll || scroll.offset === undefined || scroll.offset === null) {
      return;
    }
    // console.log('Scroll offset:', scroll.offset)
    const newFade = Math.max(0, 1 - scroll.offset * 10); // Fully fades out at 0.1

    if (groupRef.current) {
      // When completely faded, make the group non-interactive
      groupRef.current.visible = newFade > 0.01;

      groupRef.current.children.forEach((child) => {
        // Only Mesh objects have a material property
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mesh = child as any;
        if (mesh.material) {
          mesh.material.opacity = newFade;
          mesh.material.transparent = true;
        }
      });
    }
  });
  const textMaterial = (
    <meshStandardMaterial
      color="#204bd6"
      emissive="#006400"
      emissiveIntensity={0.3}
      roughness={0.3}
      metalness={0.1}
    />
  );

  const test = textLines.join('\n'); // Join lines for debugging

  // Don't render until viewport is properly initialized
  if (!isViewportReady || calculatedSize <= 0) {
    return null;
  }

  return (
    <Center
      position={group1Props.position}
      rotation={group1Props.rotation}
      scale={group1Props.scale}
    >
      <group ref={groupRef} rotation={[0, -0.05, 0]}>
        <Text3D
          {...commonTextProps}
          size={0.1}
          position={[0, 0, 0]}
          material-transparent={true}
          lineHeight={0.7}
        >
          {test}
          {React.cloneElement(textMaterial)}
        </Text3D>
      </group>
    </Center>
  );
};

export default BannerText;
