import { CLEAR_SELECTED_SCENES, CREATE_SCENE, DESELECT_ONE_MORE_SCENE, MyReduxTypes, SELECT_ONE_MORE_SCENE, SELECT_ONE_SCENE } from "./types";
import { ExcursionScene } from '../models/ExcursionScene';

const initialState = {
    scenes: [] as ExcursionScene[],
    selectedSceneIds: [] as string[]
}

export const editorReducer = (state = initialState, action: MyReduxTypes) => {
    switch (action.type) {
        case CREATE_SCENE:
            return {
                ...state,
                scenes: [...state.scenes, action.payload],
                selectedSceneIds: [...state.selectedSceneIds]
            }
        case SELECT_ONE_SCENE:
            return {
                ...state,
                scenes: [...state.scenes],
                selectedSceneIds: [action.payload]
            }
        case SELECT_ONE_MORE_SCENE:
            return {
                ...state,
                scenes: [...state.scenes],
                selectedSceneIds: [...state.selectedSceneIds, action.payload]
            }
        case DESELECT_ONE_MORE_SCENE:
            return {
                ...state,
                scenes: [...state.scenes],
                selectedSceneIds: state.selectedSceneIds.filter(s => s != action.payload)
            }
        case CLEAR_SELECTED_SCENES:
            return {
                ...state,
                scenes: [...state.scenes],
                selectedSceneIds: []
            }
        default:
            return state;
    }
}