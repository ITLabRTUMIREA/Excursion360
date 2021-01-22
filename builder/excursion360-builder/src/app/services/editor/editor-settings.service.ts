import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorSettingsService {
  


  private showLabelsSubject = new BehaviorSubject<boolean>(false);
  public showLabels$ = this.showLabelsSubject.asObservable();
  public get showLabels(): boolean {
    return this.showLabelsSubject.value;
  }
  public setShowLabels(showLabels: boolean): void {
    this.showLabelsSubject.next(showLabels);
  }

  private labelsSizeSubject = new BehaviorSubject<number>(24);
  public labelsSize$ = this.labelsSizeSubject.asObservable();
  public get labelsSize(): number {
    return this.labelsSizeSubject.value;
  }
  public setLabelsSize(size: number) {
    this.labelsSizeSubject.next(size);
  }


  constructor() { }
}
