import { useRef, useMemo, useEffect } from 'react';
import { type Object3DNode, Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { LumaSplatsThree } from '@lumaai/luma-web'
import { AdaptiveDpr, TransformControls, Text, OrbitControls } from '@react-three/drei'
import { CineonToneMapping, Vector3, CatmullRomCurve3, AxesHelper } from 'three'
import { useControls } from 'leva'
import { degToRad } from 'three/src/math/MathUtils.js';

extend({ LumaSplats: LumaSplatsThree })

// For typeScript support:
declare module '@react-three/fiber' {
    interface ThreeElements {
        lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>
    }
}

const Axis = ({ size = 1 }) => {
    const { scene } = useThree()
    useEffect(() => {
        const axes = new AxesHelper(size)
        scene.add(axes)
        return () => {
            scene.remove(axes);
        };
    }, [scene, size])
    return null
}

const keyframes = [ // ← Extracted from your JSON
    { position: [-1.7728, 1.1813, -6.5147] },
    { position: [-4.4588, 1.7557, -0.0844] },
    { position: [1.0851, 1.4023, 6.3791] },
    { position: [3.9527, 0.2770, 0.8684] },
    { position: [2.8546, 0.3627, -2.8592] },
    { position: [1.5920, 1.8491, -5.1255] },
    { position: [-0.7431, 2.5308, -8.0545] },
]

// Custom camera controller to follow scroll
const CameraController = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) => {
    const { camera } = useThree();

    const curve = useMemo(() => {
        const points = keyframes.map(k => new Vector3(...k.position))
        return new CatmullRomCurve3(points)
    }, [])

    const target = new Vector3();
    useFrame(() => {
        if (!scrollRef.current) return

        const scrollTop = scrollRef.current.scrollTop
        const maxScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        const scrollFactor = Math.min(scrollTop / maxScroll, 1)

        const point = curve.getPointAt(scrollFactor)
        camera.position.lerp(point, 0.1)
        // console.log('Camera position:', camera.position)

        // Optional: look ahead slightly to create natural motion
        curve.getPointAt(Math.min(scrollFactor + 0.01, 1), target)
        camera.lookAt(0, 0, 0);
    })

    return null;
};

export default function App() {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Leva controls for Group 1 (Text group)
    const group1Props = useControls('Text Group', {
        position: { value: [0, 0, 0], step: 0.01 },
        rotation: { value: [0, 0, 0], step: 0.01 },
        scale: { value: 1, min: 0.1, max: 3, step: 0.01 },
    })

    return (
        <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {/* <div
                ref={scrollRef}
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    overflowY: 'scroll',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    scrollBehavior: 'smooth',
                }}
            >
                <div style={{ height: '300vh', padding: '50vh 20px', color: 'white' }}>
                </div>
            </div> */}
            <Canvas
                gl={{
                    antialias: false,
                    toneMapping: CineonToneMapping,
                }}>
                <AdaptiveDpr pixelated />
                {/* <OrbitControls /> */}

                <Axis size={2} />

                {/* <CameraController scrollRef={scrollRef} /> */}
                <OrbitControls />
                <TransformControls mode="translate" >
                    {/* position = {[{ "position": [-0.279, -0.07, -1.05] }]} */}
                    {/* rotation={[0,-0.18,0]} */}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <group
                        position={group1Props.position}
                        rotation={group1Props.rotation}
                        scale={group1Props.scale}
                    >
                        <Text fontSize={0.3} position={[1, 1.4, 1]} rotation={[0, -1, 0]}>
                            Escape to Serenity
                        </Text>
                        <Text fontSize={0.2} position={[1, 1, 1]} rotation={[0, -1, 0]}>
                            Discover the untouched beauty of Wayanad.
                        </Text>
                        <Text fontSize={0.2} position={[1, 0.8, 1]} rotation={[0, -1, 0]}>
                            Where nature whispers.
                        </Text>
                        <Text fontSize={0.2} position={[1, 0.6, 1]} rotation={[0, -1, 0]}>
                            and tranquility finds you.
                        </Text>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                    </group>
                </TransformControls>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <group rotation={[0, degToRad(90), -0.06]} position={[0.25, 0, 0.05]} scale={1}>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <lumaSplats
                        loadingAnimationEnabled={true}
                        particleRevealEnabled={true}
                        enableThreeShaderIntegration={false}
                        source="https://lumalabs.ai/capture/f4d017cc-de2c-44fb-ab6d-8cb5096959a1"
                    />
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                </group>
            </Canvas>
        </div>
    )
}
