import SceneWrapper from './ThreeScenes/SceneWrapper';

const FullScene = () => {
    return (
        <div className='full-scene' style={{ height: '100%' }}>
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
            <SceneWrapper />

        </div>
    )
}

export default FullScene;