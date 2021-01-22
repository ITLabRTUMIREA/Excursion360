import { createReducer, on } from "@ngrx/store"
import { createScene, removeScene, renameScene } from "./scenes.actions"
import { SceneState } from "./models/sceneState"
import { ExcursionScene } from "./models/excursionScene"
import { v4 as uuidV4 } from "uuid"
import { Vector3 } from "@babylonjs/core"

export const initialState: ExcursionScene[] = [];

const _sceneReducer = createReducer(initialState,
    on(createScene, (state, action) => [...state, new ExcursionScene(uuidV4(), action.title, action.position)]),
    on(renameScene, (state, action) => state.map(s => s.id === action.id ? {...s, title: action.title} : s))
);

export function scenesReducer(state, action) {
    return _sceneReducer(state, action);
}