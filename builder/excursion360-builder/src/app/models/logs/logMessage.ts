import { LogLevel } from "./logLevel";

export class LogMessage {
    constructor(
        public readonly sender: string,
        public readonly level: LogLevel,
        public readonly message: string,
        public readonly date: Date
    ) {
    }
}