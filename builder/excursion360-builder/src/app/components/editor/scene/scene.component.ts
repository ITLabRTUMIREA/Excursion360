import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { EngineService } from 'src/app/services/editor/engine.service';
import { Scene, MeshBuilder, ActionManager, ExecuteCodeAction, UniversalCamera, Vector3, AxesViewer, GizmoManager, AbstractMesh, PointerEventTypes, HighlightLayer, Color3, Mesh } from '@babylonjs/core';import { SceneStateService } from 'src/app/services/editor/scene-state.service';
import { EditorSettingsService } from 'src/app/services/editor/editor-settings.service';
import { Subscription, from } from 'rxjs';
import { ExcursionScene } from 'src/app/models/excursionScene';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { FillModelBehavior } from '../../../models/fillModelBehavior';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit, OnDestroy {
  private _scene: Scene;
  private _gizmoManager: GizmoManager;
  private _gizmoMiddlePoint: AbstractMesh;
  private _highlight: HighlightLayer;
  private _screenUi: AdvancedDynamicTexture;

  private _sceneWrappers: Map<ExcursionScene, { mesh: Mesh, titleBlock: TextBlock }> = new Map();

  @ViewChild('scene_canvas')
  public canvas: ElementRef<HTMLCanvasElement>;

  addSceneRef: Subscription;
  selectedSceneRef: Subscription;
  gizmoAttachRef: any;

  constructor(
    private engineService: EngineService,
    private sceneState: SceneStateService,
    private store: Store<{scenes: ExcursionScene[]}>,
    private editorSettings: EditorSettingsService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.engineService.initEngine(this.canvas.nativeElement);
    // this._scene = new Scene(this.engineService.engine);

    // this._screenUi = AdvancedDynamicTexture.CreateFullscreenUI("full screen ui");
    // this.editorSettings.showLabels$.subscribe(showLabels => {
    //   for (let sceneObject of this._sceneWrappers.values()) {
    //     sceneObject.titleBlock.isVisible = showLabels;
    //   }
    // });
    // this.editorSettings.labelsSize$.subscribe(labelSize => {
    //   for (let sceneObject of this._sceneWrappers.values()) {
    //     sceneObject.titleBlock.fontSize = labelSize;
    //   }
    // });
    // this.setupGizmo();
    // this.setupCamera(this.canvas.nativeElement);

    // this._scene.createDefaultLight();
    // const gridMaterial = new GridMaterial("groundMaterial", this._scene);

    // gridMaterial.lineColor = Color3.Black();
    // gridMaterial.opacity = 0.99;
    // const env = this._scene.createDefaultEnvironment({
    //   createGround: false,
    //   skyboxSize: 1000
    // });
    // const ground = MeshBuilder.CreatePlane("ground", {
    //   width: 1000,
    //   height: 1000,
    //   sideOrientation: Mesh.DOUBLESIDE
    // });
    // ground.material = gridMaterial;
    // ground.rotate(Vector3.Right(), Math.PI / 2);
    // ground.isPickable = false;

    // this.store.pipe(select("scenes")).subscribe(
    //   // TODO reRender scene
    // );

    // this.selectedSceneRef = this.sceneState.selectedScenes$.subscribe(
    //   (excScenes) => {
    //     this.unpackFromGizmo();
    //     if (excScenes.length === 0) {
    //       this._gizmoManager.attachToMesh(null);
    //     } else {
    //       this._gizmoManager.attachToMesh(this._gizmoMiddlePoint);
    //       const meshes = excScenes
    //         .map(sc => this._sceneWrappers.get(sc));

    //       this._gizmoMiddlePoint.position = meshes
    //         .map(m => m.mesh.getAbsolutePosition())
    //         .reduce((v1, v2) => v1.add(v2))
    //         .scale(1 / excScenes.length);

    //       meshes.forEach(m => {
    //         this._highlight.addMesh(m.mesh, Color3.Gray());
    //         var newPosition = m.mesh.absolutePosition.subtract(this._gizmoMiddlePoint.getAbsolutePosition());
    //         m.mesh.setParent(this._gizmoMiddlePoint);
    //         m.mesh.position = newPosition
    //       });
    //     }
    //   }
    // );

    // this.engineService.registerScene(this._scene);
  }

  private unpackFromGizmo() {
    // this._highlight.removeAllMeshes();
    // this._gizmoMiddlePoint.getChildMeshes().forEach(m => {
    //   var newPosition = m.absolutePosition.subtract(this._gizmoMiddlePoint.getAbsolutePosition());
    //   m.setParent(null);
    //   m.position = newPosition.add(this._gizmoMiddlePoint.position);
    // });
  }

  private setupCamera(canvas: HTMLCanvasElement) {
    var camera = new UniversalCamera("UniversalCamera", new Vector3(5, 5, 10), this._scene);
    camera.keysUp.push(87); // "w"
    camera.keysLeft.push(65); // "a"
    camera.keysDown.push(83); // "s"
    camera.keysRight.push(68); // "d"

    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.inputs.attached.mouse["buttons"] = [2];// only right key
  }

  private setupGizmo() {
    this._highlight = new HighlightLayer("gizmo highlight", this._scene);
    const gizmoManager = new GizmoManager(this._scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = false;
    gizmoManager.scaleGizmoEnabled = false;
    gizmoManager.boundingBoxGizmoEnabled = false;
    gizmoManager.usePointerToAttachGizmos = false;
    gizmoManager.clearGizmoOnEmptyPointerEvent = false;
    gizmoManager.attachableMeshes = [];

    this._scene.onPointerObservable.add(ed => {
      if (ed.type != PointerEventTypes.POINTERDOWN)
        return;
      if (!Array.from(this._sceneWrappers.values()).map(m => m.mesh as AbstractMesh).includes(ed.pickInfo.pickedMesh)) {
        this.sceneState.selectionChanged([]);
      }
    });
    this._gizmoManager = gizmoManager;
    this._gizmoMiddlePoint = MeshBuilder.CreateBox("gizmo middle box", { size: 0.1 });
    this._gizmoMiddlePoint.isVisible = false;
  }

  private addExcursionScene(excScene: ExcursionScene) {
    // const sphere = MeshBuilder.CreateSphere(`scene-${excScene.title}`, {});
    // sphere.position = excScene.position;
    // sphere.actionManager = new ActionManager(this._scene);
    // sphere.actionManager.registerAction(new ExecuteCodeAction(
    //   ActionManager.OnPickTrigger,
    //   (ev) => {
    //     if (ev.sourceEvent.ctrlKey) {
    //       this.sceneState.selectionChanged(this.sceneState.selectedScenes.concat([excScene]));
    //     } else {
    //       this.sceneState.selectionChanged([excScene]);
    //     }
    //   }
    // ));

    // sphere.addBehavior(new FillModelBehavior(excScene));

    // var titleText = new TextBlock("scene_title");
    // titleText.linkOffsetY = -50;
    // titleText.text = excScene.title;
    // titleText.color = "black";
    // titleText.fontSize = this.editorSettings.labelsSize;
    // titleText.isVisible = this.editorSettings.showLabels;
    // this._screenUi.addControl(titleText);
    // titleText.linkWithMesh(sphere);
    // this._sceneWrappers.set(excScene, { mesh: sphere, titleBlock: titleText });
  }


  ngOnDestroy(): void {
    this.addSceneRef.unsubscribe();
    this.selectedSceneRef.unsubscribe();
  }
}
