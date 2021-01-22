import { ExcursionScene } from '../models/ExcursionScene';
export const CREATE_SCENE = "EDITOR/CREATE_SCENE";
export const SELECT_ONE_SCENE = "EDITOR/SELECT_ONE_SCENE";
export const SELECT_ONE_MORE_SCENE = "EDITOR/SELECT_ONE_MORE_SCENE";
export const DESELECT_ONE_MORE_SCENE = "EDITOR/DESELECT_ONE_MORE_SCENE";
export const CLEAR_SELECTED_SCENES = "EDITOR/CLEAR_SELECTED_SCENES";


export interface CreateSceneAction {
    type: typeof CREATE_SCENE,
    payload: ExcursionScene
}

export interface SelectOneSceneAction {
    type: typeof SELECT_ONE_SCENE,
    payload: string
}


export interface SelectOneMoreSceneAction {
    type: typeof SELECT_ONE_MORE_SCENE,
    payload: string
}

export interface DeselectOneMoreSceneAction {
    type: typeof DESELECT_ONE_MORE_SCENE,
    payload: string
}

export interface ClearSelectedScenesAction {
    type: typeof CLEAR_SELECTED_SCENES
}

export type MyReduxTypes =
    CreateSceneAction
    | SelectOneSceneAction
    | SelectOneMoreSceneAction
    | DeselectOneMoreSceneAction
    | ClearSelectedScenesAction
