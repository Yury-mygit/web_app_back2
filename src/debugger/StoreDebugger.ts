import { IStore } from '../servises/store'; // Adjust the import path as necessary
import fs from 'fs';
import path from 'path';

export class StoreDebugger {
    private logFilePath: string;
    private changeLog: Array<{ key: string; oldValue: any; newValue: any }> = [];

    constructor(store: IStore, logFileName: string) {
        this.logFilePath = path.join(__dirname, logFileName);
        store.subscribe(this.logChange);
        this.loadChangeLog();
    }


    private loadChangeLog(): void {
        if (fs.existsSync(this.logFilePath)) {
            const logData = fs.readFileSync(this.logFilePath, 'utf-8');
            this.changeLog = JSON.parse(logData);
        }
    }

    private getCircularReplacer() {
        const seen = new WeakSet();
        return (key:any, value:any) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return; // Omit circular reference
                }
                seen.add(value);
            }
            return value;
        };
    }

    private saveChangeLog(): void {
        fs.writeFileSync(this.logFilePath, JSON.stringify(this.changeLog, this.getCircularReplacer(), 2));
    }

    private logChange = (key: string, oldValue: any, newValue: any): void => {
        const changeRecord = { key, oldValue, newValue };
        this.changeLog.push(changeRecord);
        this.saveChangeLog();
    };

    public getChangeLog(): Array<{ key: string; oldValue: any; newValue: any }> {
        return this.changeLog;
    }
}