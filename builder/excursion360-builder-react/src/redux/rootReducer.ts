import { combineReducers } from 'redux'
import { editorReducer } from './editorReducer'
export const rootReduser = combineReducers({
    editor: editorReducer
})
export type RootState = ReturnType<typeof rootReduser>
