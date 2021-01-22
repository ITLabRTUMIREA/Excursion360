import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./scene"
import { Store, select } from '@ngrx/store';
import { ExcursionScene } from 'src/app/models/excursionScene';

const reactContainerElementName = "myReactSceneContainer";
@Component({
  selector: 'app-react-scene',
  template: `<div class="sceneContainer" #${reactContainerElementName}></div>`,
  styleUrls: ['./react-scene.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReactSceneComponent implements OnChanges, OnDestroy, AfterViewInit {

  private scenes: ExcursionScene[] = [];
  @ViewChild(reactContainerElementName, { static: false }) reactContainerRef: ElementRef;
  constructor(private store: Store<{ scenes: ExcursionScene[] }>) {

  }
  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.reactContainerRef.nativeElement);
  }
  ngAfterViewInit(): void {
    this.render();
    this.store.pipe(select("scenes")).subscribe(scenes => {
      this.scenes = scenes;
      this.render();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  private render() {
    const { scenes } = this;
    ReactDOM.render(<App scenes={scenes}></App>, this.reactContainerRef.nativeElement);
  }

}
