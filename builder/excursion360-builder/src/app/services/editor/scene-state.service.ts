import { Injectable } from '@angular/core';
import { ExcursionScene } from '../../models/excursionScene';
import { Vector3, GizmoManager, Scene, UniversalCamera } from '@babylonjs/core';
import { EngineService } from './engine.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class SceneStateService {
  private selectedSceneSource = new BehaviorSubject<ExcursionScene[]>([]);
  public selectedScenes$ = this.selectedSceneSource.asObservable();
  public get selectedScenes() {
    return this.selectedSceneSource.value;
  }

  constructor() { }

  public selectionChanged(scenes: ExcursionScene[]) {
    if ((this.selectedScenes.length === 0 && scenes.length === 0) ||
      this.selectedScenes === scenes) {
        return;
      }
      this.selectedSceneSource.next(scenes);
  }
}
