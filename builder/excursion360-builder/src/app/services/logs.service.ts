import { Injectable } from '@angular/core';
import { LogMessage } from '../models/logs/logMessage';
import { Logger } from '../models/logs/logger';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private logsSource = new Subject<LogMessage>();
  public logs$ = this.logsSource.asObservable();

  constructor() { }

  public createLogger(sender: string): Logger {
    return new Logger(
      sender,
      (s, l, m) => this.logsSource.next(new LogMessage(s, l, m, new Date()))
    );
  }
}
