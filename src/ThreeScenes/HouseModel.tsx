import { type Object3DNode, extend } from '@react-three/fiber'
import { LumaSplatsThree } from '@lumaai/luma-web'
import { degToRad } from 'three/src/math/MathUtils.js';
extend({ LumaSplats: LumaSplatsThree })

// For typeScript support:
declare module '@react-three/fiber' {
    interface ThreeElements {
        lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>
    }
}

const HouseModel = () => {
    return (
        <group rotation={[0, degToRad(0), -0.06]} position={[0, 0.2, 0.25]} scale={1.1} >
            <lumaSplats
                loadingAnimationEnabled={true}
                particleRevealEnabled={true}
                enableThreeShaderIntegration={false}
                source="https://lumalabs.ai/capture/f4d017cc-de2c-44fb-ab6d-8cb5096959a1"
            />
        </group >
    )
}

export default HouseModel