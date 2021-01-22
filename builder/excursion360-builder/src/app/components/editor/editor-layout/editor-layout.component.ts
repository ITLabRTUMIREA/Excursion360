import { Component, OnInit } from '@angular/core';
import { EngineService } from 'src/app/services/editor/engine.service';
import { SceneState } from 'src/app/models/sceneState';
import { SceneStateService } from 'src/app/services/editor/scene-state.service';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss'],
  providers: [EngineService, SceneStateService,]
})
export class EditorLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
