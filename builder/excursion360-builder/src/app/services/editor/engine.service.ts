import { Injectable, OnDestroy } from '@angular/core';
import { Engine, Scene } from '@babylonjs/core';

@Injectable()
export class EngineService implements OnDestroy {
  engine: Engine;
  private scenes: Scene[] = [];
  constructor() { }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  public initEngine(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true, { stencil: true });
    window.onresize = (a) => {
      this.engine.resize();
    }
    this.runRenderLoop();
  }

  public registerScene(scene: Scene) {
    this.scenes.push(scene);
    this.runRenderLoop();
  }

  private runRenderLoop() {
    setTimeout(() => {
      this.engine.stopRenderLoop();
      this.engine.runRenderLoop(() => {
        this.scenes.forEach(scene => {
          scene.render()
        });
      });
    }, 100);
  }
}
