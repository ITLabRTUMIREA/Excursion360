import { createReducer, on } from "@ngrx/store"
import { SceneState } from "./models/sceneState"
import { ExcursionScene } from "./models/excursionScene"
import { v4 as uuidV4 } from "uuid"
import { Vector3 } from "@babylonjs/core"
import { moveDown } from "./position.actions"

export const initialState: number = 0;

const _positionReducer = createReducer(initialState,
    on(moveDown, (state, action) => state - action.distance)
);

export function positionReducer(state, action) {
    return _positionReducer(state, action);
}