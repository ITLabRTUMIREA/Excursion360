import { Component, OnInit } from '@angular/core';
import { EditorSettingsService } from 'src/app/services/editor/editor-settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  public get showLabels(): boolean {
    return this.editorSettings.showLabels;
  }

  public set showLabels(value: boolean) {
    this.editorSettings.setShowLabels(value);
  }

  public get labelsSize(): number {
    return this.editorSettings.labelsSize;
  }

  public set labelsSize(size: number) {
    this.editorSettings.setLabelsSize(size);
  }

  constructor(private editorSettings: EditorSettingsService) { }

  ngOnInit(): void {
  }

}
