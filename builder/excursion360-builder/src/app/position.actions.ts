import { createAction, props } from '@ngrx/store';

export const moveDown = createAction("[Excursion editor] Move sphere down", props<{distance: number}>());
