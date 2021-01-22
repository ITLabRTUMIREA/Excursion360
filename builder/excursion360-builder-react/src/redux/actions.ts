import { ExcursionScene } from '../models/ExcursionScene';
import { ClearSelectedScenesAction, CLEAR_SELECTED_SCENES, CreateSceneAction, CREATE_SCENE, DeselectOneMoreSceneAction, DESELECT_ONE_MORE_SCENE, SelectOneMoreSceneAction, SelectOneSceneAction, SELECT_ONE_MORE_SCENE, SELECT_ONE_SCENE } from "./types";

export function createScene(scene: ExcursionScene): CreateSceneAction {
    return {
        type: CREATE_SCENE,
        payload: scene
    }
}

export function selectOneScene(sceneId: string): SelectOneSceneAction {
    return {
        type: SELECT_ONE_SCENE,
        payload: sceneId
    }
}

export function selectOneMoreScene(sceneId: string): SelectOneMoreSceneAction {
    return {
        type: SELECT_ONE_MORE_SCENE,
        payload: sceneId
    }
}

export function deselectOneScene(sceneId: string): DeselectOneMoreSceneAction {
    return {
        type: DESELECT_ONE_MORE_SCENE,
        payload: sceneId
    }
}

export function clearSelectedScenes(): ClearSelectedScenesAction {
    return {
        type: CLEAR_SELECTED_SCENES
    }
}

export { };