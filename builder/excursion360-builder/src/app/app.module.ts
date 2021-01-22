import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { scenesReducer } from './scenes.reducer';
import { positionReducer } from './position.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './components/editor/scene/scene.component';
import { ToolbarComponent } from './components/editor/toolbar/toolbar.component';
import { EditorLayoutComponent } from './components/editor/editor-layout/editor-layout.component';
import { ContentTreeComponent } from './components/editor/content-tree/content-tree.component';
import { LogsViewerComponent } from './components/logs-viewer/logs-viewer.component';
import { SceneInspectorComponent } from './components/editor/scene-inspector/scene-inspector.component';
import { ReactSceneComponent } from './components/editor/react-scene/react-scene.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    ToolbarComponent,
    EditorLayoutComponent,
    ContentTreeComponent,
    LogsViewerComponent,
    SceneInspectorComponent,
    ReactSceneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      scenes: scenesReducer,
      position: positionReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
