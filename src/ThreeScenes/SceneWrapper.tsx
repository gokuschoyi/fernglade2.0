import { useEffect, useState, } from 'react';
import { AxesHelper, CineonToneMapping } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptiveDpr, ScrollControls } from '@react-three/drei';
import { CameraController } from './CameraRig';
import HouseModel from './HouseModel';
import BannerText from './BannerText';
import Tag from './AnimatedFlag';

import * as THREE from 'three';

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

const keyframes = [
    { position: [2.687, -0.071, -1.63] },
    { position: [-0.684, 1.416, -4.746] },
    { position: [-2.569, 1.047, -2.979] },
    { position: [-3.487, 1.176, -1.741] },
    { position: [-2.939, 0.986, -0.519] },
    { position: [-2.243, 0.782, 2.059] },
    { position: [-0.59, 0.26, 3.077] },
    { position: [0.585, 0.044, 2.142] },
    { position: [1.633, 0.281, 1.479] },
    { position: [2.091, 0.65, -0.373] },
    { position: [0.414, 0.383, -2.148] },
    { position: [-1.172, 0.47, -1.828] },
    { position: [-2.093, 0.665, -0.336] },
    { position: [-1.689, 0.404, 1.385] },
    { position: [1.26, -0.071, 2.879] },
    { position: [2.578, 0.002, -1.799] },
]

const SceneWrapper = () => {
    const [position, setPosition] = useState(0);
    // const { camera } = useThree();

    // const translateCamera = () => {
    //     console.log('Button clicked, position:', position);
    //     const offset = position / (keyframes.length - 1);
    //     const point = curve.getPointAt(offset);
    //     camera.position.lerp(point, 0.1);
    //     camera.lookAt(0, 0, 0);
    // }

    const goForward = () => {
        setPosition(prev => Math.min(prev + 1, keyframes.length - 1));
        // translateCamera();
    }

    const goBackward = () => {
        setPosition(prev => Math.max(prev - 1, 0));
        // translateCamera();
    }
    console.log('Current position:', position);

    return (
        <div className='scene-wrapper' style={{ height: '100%' }}>
            <Canvas
                gl={{
                    antialias: false,
                    toneMapping: CineonToneMapping,
                }}
            >
                <AdaptiveDpr pixelated />
                {/* <OrbitControls /> */}

                <Axis size={3} />
                <ScrollControls pages={15} damping={0.5} horizontal={false}>
                    <CameraController offset={position / (keyframes.length - 1)} />
                    <HouseModel />
                    <BannerText />
                    {/* <Tag type={'image'} range_low={0} range_high={0.2} /> */}
                    <Tag position={new THREE.Vector3(-0.2, 0, -0.65)} type={'text'} range_low={0.65} range_high={0.70} lineHeight={0.5}/>
                    <Tag position={new THREE.Vector3(-0.2, -0.01, -0.25)} type={'text'} range_low={0.70} range_high={0.75} lineHeight={0.3}/>
                </ScrollControls>
            </Canvas>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
                <div className='=fixed-progress-button'>
                    <button type='button' onClick={goForward}>Click</button>
                    <button type='button' onClick={goBackward}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default SceneWrapper