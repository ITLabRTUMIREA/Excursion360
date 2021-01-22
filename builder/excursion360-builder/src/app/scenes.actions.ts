import { createAction, props } from '@ngrx/store';
import { ExcursionVector3 } from './models/excursionVector3';


export const createScene = createAction("[Excursion editor] Create Scene", props<{title: string, position: ExcursionVector3}>());
export const removeScene = createAction("[Excursion editor] Remove Scene");
export const renameScene = createAction("[Excursion editor] Rename Scene", props<{id: string, title: string}>());
