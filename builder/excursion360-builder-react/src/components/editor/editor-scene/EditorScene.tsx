import { Vector3, Color3, Mesh, ActionManager, ExecuteCodeAction, HighlightLayer } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';
import React from 'react'
import { selectOneScene, selectOneMoreScene, clearSelectedScenes } from "../../../redux/actions";
import { Engine, Scene } from 'react-babylonjs';
import { connect } from 'react-redux';


import { ExcursionScene } from '../../../models/ExcursionScene';
import { RootState } from '../../../redux/rootReducer';
import './EditorScene.scss';
import { ClearSelectedScenesAction, SelectOneMoreSceneAction, SelectOneSceneAction } from '../../../redux/types';

interface SceneProps {
    scenes: ExcursionScene[] | null,
    selectedSceneIds: string[],
    selectOneScene: (sceneId: string) => SelectOneSceneAction,
    selectOneMoreScene: (sceneId: string) => SelectOneMoreSceneAction,
    clearSelectedScenes: () => ClearSelectedScenesAction
}
class EditorScene extends React.Component<SceneProps> {
    public static defaultProps = {
        scenes: []
    };
    private gridMaterialCache: GridMaterial | null = null;
    private sceneObjects: Record<string, Mesh> = {};
    private highlightLayer: HighlightLayer | null = null;
    groundRefFunc(instance: Mesh) {
        if (!instance) {
            return;
        }
        if (this.highlightLayer) {
            this.highlightLayer.addExcludedMesh(instance);
        }
        if (!this.gridMaterialCache) {
            const gridMaterial = new GridMaterial("ground_material", instance._scene);
            gridMaterial.mainColor = Color3.White();
            gridMaterial.lineColor = Color3.Black();
            gridMaterial.opacity = 0.8;
            gridMaterial.sideOrientation = Mesh.DOUBLESIDE; // TODO fix double side grid
            this.gridMaterialCache = gridMaterial;
        }
        instance.material = this.gridMaterialCache;
        if (!instance.actionManager) {
            instance.actionManager = new ActionManager(instance._scene);
        }
        if (!instance.actionManager.hasSpecificTrigger(ActionManager.OnRightPickTrigger)) {
            instance.actionManager.registerAction(new ExecuteCodeAction(
                ActionManager.OnRightPickTrigger,
                (ev) => {
                    if (this.props.selectedSceneIds && this.props.selectedSceneIds.length > 0) {
                        this.props.clearSelectedScenes();
                    }
                }
            ))
        }
    }
    highlightRef(instance: HighlightLayer) {
        if (instance) {
            this.highlightLayer = instance;
        }
    }

    sceneObjectRef(mesh: Mesh, id: string) {
        if (!mesh) {
            return;
        }

        this.sceneObjects[id] = mesh;
        if (!mesh.actionManager) {
            mesh.actionManager = new ActionManager(mesh._scene);
        }
        if (!mesh.actionManager.hasSpecificTrigger(ActionManager.OnLeftPickTrigger)) {
            mesh.actionManager.registerAction(new ExecuteCodeAction(
                ActionManager.OnLeftPickTrigger,
                (ev) => {
                    if ((ev.sourceEvent as PointerEvent).ctrlKey) {
                        this.props.selectOneMoreScene(id);
                    } else {
                        this.props.selectOneScene(id);
                    }
                }
            ))
        }
    }

    componentDidMount() {
        this.updateHighlight();
    }

    componentDidUpdate() {
        this.updateHighlight();
    }

    private updateHighlight() {
        if (this.highlightLayer) {
            this.highlightLayer.removeAllMeshes();
            this.props.selectedSceneIds.forEach(sceneId => {
                if (this.sceneObjects[sceneId]) {
                    this.highlightLayer!.addMesh(this.sceneObjects[sceneId], Color3.White());
                }
            });
        }
    }

    render() {
        const { scenes } = this.props;
        return (
            <Engine antialias adaptToDeviceRatio canvasId='editor-scene-canvas' >
                <Scene>
                    <arcRotateCamera keysUp={["w".charCodeAt(0)]} name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
                    <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
                    <highlightLayer name='hl' ref={i => this.highlightRef(i as HighlightLayer)} />
                    {scenes && scenes.map(s =>
                        <box name="box"
                            ref={i => this.sceneObjectRef(i as Mesh, s.id)}
                            key={s.id}
                            position={new Vector3(s.position.x, s.position.y, s.position.z)}>

                        </box>
                    )}
                    {
                        // TODO fix double side grid
                        [{ rotation: 0, id: "top" }, { rotation: Math.PI, id: "bottom" }].map(i =>
                            <ground
                                ref={i => this.groundRefFunc(i as Mesh)}
                                name={`base_ground_${i.id}`}
                                width={50}
                                height={50}
                                subdivisions={2}
                                rotation={new Vector3(0, 0, i.rotation)}
                                receiveShadows={true}
                                key={i.id}>
                            </ground>
                        )
                    }
                </Scene>
            </Engine>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { scenes: state.editor.scenes, selectedSceneIds: state.editor.selectedSceneIds };
}
const mapDispatchToProps = {
    selectOneScene, selectOneMoreScene, clearSelectedScenes
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorScene);