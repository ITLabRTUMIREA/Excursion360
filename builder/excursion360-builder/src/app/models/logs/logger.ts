import { LogLevel } from "./logLevel";

export class Logger {
    constructor(
        public readonly sender: string,
        private readonly logFunc: (sender: string, level: LogLevel, messakge: string) => void) {
    }

    public log(level: LogLevel, message: string) {
        this.logFunc(this.sender, level, message);
    }
    public logTrace(message: string) {
        this.log(LogLevel.Trace, message);
    }
    public logDebug(message: string) {
        this.log(LogLevel.Debug, message);
    }
    public logInfo(message: string) {
        this.log(LogLevel.Information, message);
    }
    public logWarning(message: string) {
        this.log(LogLevel.Warning, message);
    }
    public logError(message: string) {
        this.log(LogLevel.Error, message);
    }
    public logCritical(message: string) {
        this.log(LogLevel.Critical, message);
    }
}