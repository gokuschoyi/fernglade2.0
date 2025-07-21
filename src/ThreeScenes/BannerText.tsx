import React from 'react'
import { useScroll, Text3D } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { useControls } from 'leva'
// import { degToRad } from 'three/src/math/MathUtils.js'

const commonTextProps = {
    font: "/src/assets/Montserrat.json",
    height: 0.03, // Reduced height for smaller text
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01, // Reduced bevel for smaller text
    bevelSize: 0.005,    // Reduced bevel for smaller text
    bevelOffset: 0,
    bevelSegments: 3,
    anchorX: "center" as const, // Correct: Centers the Text3D block at its x-position
    anchorY: "middle" as const, // Correct: Centers the Text3D block at its y-position
    textAlign: "center" as const,
};

const BannerText = () => {
    const scroll = useScroll()
    const groupRef = useRef<Group>(null)
    const { viewport } = useThree()
    const scaleFactor = 0.03 // tweak based on design
    console.log('size', viewport.width * scaleFactor, viewport.height * scaleFactor)
    const group1Props = useControls('TG', {
        position: { value: [0, 0, 0], step: 0.01 },
        rotation: { value: [0, 0, 0], step: 0.01 },
        scale: { value: 1, min: 0.1, max: 3, step: 0.01 },
    })

    useFrame(() => {
        const fade = Math.max(0, 1 - scroll.offset * 10) // Fully fades out at 0.1
        if (groupRef.current) {
            groupRef.current.children.forEach((child) => {
                // Only Mesh objects have a material property
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mesh = child as any;
                if (mesh.material) {
                    mesh.material.opacity = fade
                    mesh.material.transparent = true
                }
            })
        }
    })
    const textMaterial = <meshStandardMaterial color="#4FD1C5" emissive="#607c3c" emissiveIntensity={0.3} roughness={0.3} metalness={0.1} />;
    return (
        <group ref={groupRef}
            position={group1Props.position}
            rotation={group1Props.rotation}
            scale={group1Props.scale}
        >
            <Text3D
                {...commonTextProps}
                size={viewport.width * scaleFactor}
                position={[0, 1.3, 0]} // Adjust X, Y, Z as needed for your scene
                material-transparent={true} // Crucial for opacity animation
            >
                Escape to Serenity,
                {React.cloneElement(textMaterial)}
            </Text3D>
            <Text3D
                {...commonTextProps}
                size={viewport.width * scaleFactor}
                position={[0, 1, 0]}
                material-transparent={true}
            >
                Discover the untouched beauty of Wayanad.
                {React.cloneElement(textMaterial)}
            </Text3D>
            <Text3D
                {...commonTextProps}
                size={viewport.width * scaleFactor}
                position={[0, 0.7, 0]}
                material-transparent={true}
            >
                Where nature whispers.
                {React.cloneElement(textMaterial)}
            </Text3D>
            <Text3D
                {...commonTextProps}
                size={viewport.width * scaleFactor}
                position={[0, 0.4, 0]}
                material-transparent={true}
            >
                and tranquility finds you.
                {React.cloneElement(textMaterial)}
            </Text3D>
        </group>
    )
}

export default BannerText