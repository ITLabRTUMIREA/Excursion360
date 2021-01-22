import { Behavior, Mesh } from '@babylonjs/core';
import { ExcursionScene } from './excursionScene';

export class FillModelBehavior implements Behavior<Mesh> {
    public get name(): string {
        return "FillModelBehavior";
    }

    constructor(private scene: ExcursionScene) {
    }

    init(): void {
    }
    attach(target: Mesh): void {
        target.getScene().registerAfterRender(() => {
            // this.scene.position.copyFrom(target.getAbsolutePosition());
        });
    }
    detach(): void {
    }

}