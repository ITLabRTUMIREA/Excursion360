import * as React from 'react';
import { useCallback, useRef } from 'react';
import "@babylonjs/core/Physics/physicsEngineComponent"  // side-effect adds scene.enablePhysics function
import { Vector3, PhysicsImpostor, Mesh, Nullable, Color3, FresnelParameters, Texture, Scene as BScene, UniversalCamera } from '@babylonjs/core';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins'
import { Scene, Engine, Skybox } from 'react-babylonjs';
import './sceneStyles.css';
import { ExcursionScene } from 'src/app/models/excursionScene';
import { TextBlock } from '@babylonjs/gui';

let sphere: Nullable<Mesh> = null;

const onButtonClicked = () => {
    if (sphere !== null) {
        sphere.position.y -= 0.1;
    }
}

const onSceneMount = (e) => {
    const scene = e.scene as BScene;
    // Hack for do some at start
    setTimeout(() => {
        scene.activeCamera['setTarget'](Vector3.Zero());
        console.log((scene as BScene).cameras);
    }, 100);
}

const App: React.FC<{ scenes: ExcursionScene[] }> = (props) => {
    // const cameraRef = useCallback(node => {
    //     const camera = node.hostInstance as UniversalCamera;
    //     camera.setTarget(Vector3.Zero());
    // }, []);


    const sphereRefs = {};
    const sphereRefFunc = (instance, id) => {
        sphereRefs[id] = instance;
        console.log(sphereRefs);
    }

    const textRefs = {};
    const textRefsFunc = (instance, id) => {
        textRefs[id] = instance;
        if (!instance) {
            return;
        }
    }

    const fullScreenUI = (instance) => {
        for (const id in textRefs) {
            textRefs[id].hostInstance.linkWithMesh(sphereRefs[id].hostInstance);
        }
    }

    return (
        <div className="sceneContainer">
            <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
                <Scene onSceneMount={onSceneMount}>

                    <Skybox rootUrl={""} />
                    <universalCamera
                        // ref={cameraRef}
                        name="arc"
                        position={new Vector3(5, 5, 10)}
                        minZ={0.001}
                    />
                    <hemisphericLight name='hemi' direction={new Vector3(0, -1, 0)} intensity={0.8} />
                    <directionalLight name="shadow-light" setDirectionToTarget={[Vector3.Zero()]} direction={Vector3.Zero()} position={new Vector3(-40, 30, -40)}
                        intensity={0.4} shadowMinZ={1} shadowMaxZ={2500}>
                        <shadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} darkness={0.8}
                            shadowCasters={["sphere1", "dialog"]} forceBackFacesOnly={true} depthScale={100} />
                    </directionalLight>
                    {
                        props.scenes.map(excScene =>
                            <sphere ref={(instance) => sphereRefFunc(instance, excScene.id)} key={excScene.id} name={excScene.title} position={new Vector3(excScene.position.x, excScene.position.y, excScene.position.z)}>
                                <plane name="dialog" size={1} position={new Vector3(0, 1.5, 0)} sideOrientation={Mesh.BACKSIDE}>
                                    <advancedDynamicTexture
                                        name="dialogTexture"
                                        height={1024} width={1024}
                                        createForParentMesh={true}
                                        hasAlpha={true}
                                        generateMipMaps={true}
                                        samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
                                    >
                                        <rectangle name="rect-1" height={0.5} width={1} thickness={12} cornerRadius={12}>
                                            <rectangle>
                                                <textBlock text={excScene.title} fontFamily="FontAwesome" fontStyle="bold" fontSize={200} color="white" />
                                            </rectangle>
                                        </rectangle>
                                    </advancedDynamicTexture>
                                </plane>
                            </sphere>)
                    }
                    <adtFullscreenUi name="fullScreenUI" ref={fullScreenUI}>
                        {
                            props.scenes.map(excScene =>
                                <textBlock
                                    ref={(instance) => textRefsFunc(instance, excScene.id)}
                                    key={excScene.id}
                                    linkOffsetY={-50}
                                    text={excScene.title}
                                    color={"black"}
                                    fontSize={30}
                                    isVisible={true}>

                                </textBlock>
                            )
                        }
                    </adtFullscreenUi>
                    {/* <sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)}>
                        <standardMaterial name='material1' specularPower={16}
                            diffuseColor={Color3.Black()}
                            emissiveColor={new Color3(0.5, 0.5, 0.5)}
                            reflectionFresnelParameters={FresnelParameters.Parse({
                                isEnabled: true,
                                leftColor: [1, 1, 1],
                                rightColor: [0, 0, 0],
                                bias: 0.1,
                                power: 1
                            })}
                        />
                        <plane name="dialog" size={2} position={new Vector3(0, 1.5, 0)} sideOrientation={Mesh.BACKSIDE}>
                            <advancedDynamicTexture
                                name="dialogTexture"
                                height={1024} width={1024}
                                createForParentMesh={true}
                                hasAlpha={true}
                                generateMipMaps={true}
                                samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
                            >
                                <rectangle name="rect-1" height={0.5} width={1} thickness={12} cornerRadius={12}>
                                    <rectangle>
                                        <babylon-button name="close-icon" background="green" onPointerDownObservable={onButtonClicked} >
                                            <textBlock text={'\uf00d click me'} fontFamily="FontAwesome" fontStyle="bold" fontSize={200} color="white" />
                                        </babylon-button>
                                    </rectangle>
                                </rectangle>
                            </advancedDynamicTexture>
                        </plane>
                    </sphere> */}

                    <ground name="ground1" width={10} height={10} subdivisions={2} receiveShadows={true}>

                    </ground>
                    <vrExperienceHelper webVROptions={{ createDeviceOrientationCamera: false }} enableInteractions={true} />
                </Scene>
            </Engine>
        </div>
    );
}
export default App;