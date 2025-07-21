import { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { TextureLoader } from 'three'
import { animated, useSpring } from '@react-spring/three'
import useScrollProgress from '../helpers/ScrollProgress'

// Line path: [start] → [left] → [up]
// const linePoints = [
//     [0, 0, 0],    // Start
//     [-0.5, 0, 0],   // Left
//     [-0.5, 0.5, 0]    // Up
// ]

const generateLineGeometry = (lineHeight: number) => {
    return [
        new THREE.Vector3(0, 0, 0),    // Start
        new THREE.Vector3(-0.5, 0, 0),   // Left
        new THREE.Vector3(-0.5, lineHeight, 0)    // Up
    ]
};

const AnimatedLine = ({ progress, lineHeight }: { progress: number, lineHeight: number }) => {
    const ref = useRef<THREE.BufferGeometry | null>(null)

    // Memoize the curve
    const curve = useMemo(() => {
        const linePoints = generateLineGeometry(lineHeight)
        console.log('linePoints', linePoints)
        const points = linePoints.map(p => new THREE.Vector3(...p))
        return new THREE.CatmullRomCurve3(points, false, 'chordal', 0.1) // You can also use LineCurve3 if it's straight
    }, [lineHeight])

    useFrame(() => {
        if (ref.current) {
            const divisions = 100 // Number of points on the full curve
            const currentLength = Math.floor(divisions * progress)

            // Sample points along the curve up to the current progress
            const points = []
            for (let i = 0; i <= currentLength; i++) {
                points.push(curve.getPoint(i / divisions))
            }

            ref.current.setFromPoints(points)
        }
    })

    return (
        <line>
            <bufferGeometry attach="geometry" ref={ref} />
            <lineBasicMaterial color="white" linewidth={2} />
        </line>
    )
}

export const TagBox = ({ visible }: { visible: boolean }) => {
    const texture = useLoader(TextureLoader, '/public/img1.jpg') // use more for carousel

    const { opacity, scale, positionY } = useSpring({
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.5,
        positionY: visible ? 2 : 1.5,
        config: { tension: 120, friction: 20 },
    })

    return (
        <animated.mesh position-y={positionY} scale={scale}>
            <planeGeometry args={[2, 1]} />
            <animated.meshBasicMaterial
                transparent
                opacity={opacity}
                map={texture}
                toneMapped={false}
            />
        </animated.mesh>
    )
}

type TagProps = {
    type: string; // 'image' or 'text'
    range_low: number;
    range_high: number;
    position?: THREE.Vector3; // Only used for text tags
    lineHeight: number; // Optional, used for text tags
};

const Tag = ({ type, range_low, range_high, position, lineHeight }: TagProps) => {
    const progress = useScrollProgress(range_low, range_high)

    if (type === 'image') {
        return (
            <group position={[0, 0, 0]}>
                <AnimatedLine progress={progress} lineHeight={lineHeight} />
                <TagBox visible={progress >= 1} />
            </group>
        )
    }

    if (type === 'text') {
        return (
            <group position={position}>
                <AnimatedLine progress={progress} lineHeight={lineHeight} />
            </group>
        )
    }

    return null
}

export default Tag