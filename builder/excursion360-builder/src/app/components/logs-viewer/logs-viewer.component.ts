import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';
import { LogMessage } from 'src/app/models/logs/logMessage';
import { LogLevel } from 'src/app/models/logs/logLevel';

@Component({
  selector: 'app-logs-viewer',
  templateUrl: './logs-viewer.component.html',
  styleUrls: ['./logs-viewer.component.scss']
})
export class LogsViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('logMessages', {static: false}) logMessagesRef: ElementRef;
  @ViewChildren('logMessage') logMessages: QueryList<any>;

  public enabledLevels: { level: LogLevel, enabled: boolean }[];
  public logs: LogMessage[] = [];

  public get logsToView(): LogMessage[] {
    const enabledNow = this.enabledLevels.filter(l => l.enabled).map(l => l.level);
    return this.logs.filter(m => enabledNow.includes(m.level));
  }

  private logMessageContainer: any;
  private logMessagesContainer: any;
  private isNearBottom = true;

  constructor(public logsService: LogsService) { }
  ngAfterViewInit(): void {
    this.logMessagesContainer = this.logMessagesRef.nativeElement;
    this.logMessages.changes.subscribe(_ => this.onItemElementsChanged());    
  }

  ngOnInit(): void {
    this.logsService.logs$.subscribe(m => this.logs.push(m));
    this.enabledLevels = Object.values(LogLevel).map(l => { return { level: l, enabled: true } });
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }
  private scrollToBottom(): void {
    this.logMessagesContainer.scroll({
      top: this.logMessagesContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150; // is near sensitivity
    const position = this.logMessagesContainer.scrollTop + this.logMessagesContainer.offsetHeight;
    const height = this.logMessagesContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

}
