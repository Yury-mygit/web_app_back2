import { StoreDebugger} from '../debugger/StoreDebugger'; // Adjust the import path as necessary
import { generateDebugView } from './debugView';
import { Request, Response } from 'express'; // Import Request and Response types

export class DebugController {
    private storeDebugger: StoreDebugger;

    constructor(storeDebugger: StoreDebugger) {
        this.storeDebugger = storeDebugger;
        this.getDebugView = this.getDebugView.bind(this); // Bind the method to the instance
    }

    public getDebugView(req :Request, res: Response) {
        const changeLog = this.storeDebugger.getChangeLog();

        // Custom replacer to handle circular references
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key: any, value: any) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return "[Circular]";
                    }
                    seen.add(value);
                }
                return value;
            };
        };

        const changeLogHtml = changeLog.map((change: { key: any; oldValue: any; newValue: any; }) =>
            `<div class="change-log-entry">
                <div class="key">${change.key}</div>
                <div class="old-value"><pre>${JSON.stringify(change.oldValue, getCircularReplacer(), 2)}</pre></div>
                <div class="new-value"><pre>${JSON.stringify(change.newValue, getCircularReplacer(), 2)}</pre></div>
            </div>`
        ).join('');

        const htmlContent = generateDebugView(changeLogHtml);
        res.send(htmlContent);
    }
}
