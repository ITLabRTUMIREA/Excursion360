import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnChanges, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./scene"

const reactContainerElementName = "myReactSceneContainer";
@Component({
  selector: 'app-react-scene',
  template: `<div class="sceneContainer" #${reactContainerElementName}></div>`,
  styleUrls: ['./react-scene.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReactSceneComponent implements OnChanges, OnDestroy, AfterViewInit {

  @ViewChild(reactContainerElementName, { static: false }) reactContainerRef: ElementRef;
  constructor() { }
  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.reactContainerRef.nativeElement);
  }
  ngAfterViewInit(): void {
    this.render();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  private render() {
    ReactDOM.render(<App></App>, this.reactContainerRef.nativeElement);
  }

}
