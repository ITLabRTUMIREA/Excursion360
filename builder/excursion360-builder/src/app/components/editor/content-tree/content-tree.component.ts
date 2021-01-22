import { Component, OnInit, OnDestroy } from '@angular/core';
import { SceneStateService } from 'src/app/services/editor/scene-state.service';
import { Vector3 } from '@babylonjs/core';
import { Subscription, Observable } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
import { Logger } from 'src/app/models/logs/logger';
import { Store, select } from '@ngrx/store';
import { SceneState } from 'src/app/models/sceneState';
import { ExcursionScene } from 'src/app/models/excursionScene';
import { ComponentStore } from '@ngrx/component-store';
import { createScene } from 'src/app/scenes.actions';
import { ExcursionVector3 } from 'src/app/models/excursionVector3';
import { moveDown } from 'src/app/position.actions';
@Component({
  selector: 'app-content-tree',
  templateUrl: './content-tree.component.html',
  styleUrls: ['./content-tree.component.scss']
})
export class ContentTreeComponent implements OnInit, OnDestroy {
  selectedSceneRef: Subscription;
  logger: Logger;

  public scenesFromStore$: Observable<ExcursionScene[]>;

  constructor(
    public sceneState: SceneStateService,
    private store: Store<{ scenes: ExcursionScene[], position: number }>,
    logsService: LogsService) {
    this.logger = logsService.createLogger("ContentTreeComponent");
    this.scenesFromStore$ = store.pipe(select("scenes"));
  }


  ngOnInit(): void {
  }

  public addLog() {
  }
  public localMoveSphere() {
    this.store.dispatch(moveDown({ distance: 0.1 }));
  }
  public createScene() {
    // this.sceneState.createExcursionScene("New scene", Vector3.Zero());
    this.logger.logDebug("Created scene");

    this.store.dispatch(createScene({
      title: "New scene",
      position: ExcursionVector3.Zero()
    }));
  }
  public createDevScenes() {
    this.store.dispatch(createScene({
      title: "Right scene",
      position: new ExcursionVector3(1, 0, 0)
    }));
    this.store.dispatch(createScene({
      title: "Forward scene",
      position: new ExcursionVector3(0, 0, 1)
    }));
    this.store.dispatch(createScene({
      title: "Up scene",
      position: new ExcursionVector3(0, 1, 0)
    }));
  }
  ngOnDestroy(): void {
    this.selectedSceneRef.unsubscribe();
  }
}
