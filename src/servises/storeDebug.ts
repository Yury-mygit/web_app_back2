import Store, {IStore} from './store'; // Adjust the import path as necessary

export class StoreDebugger {
    private changeLog: Array<{ key: string; oldValue: any; newValue: any }> = [];

    constructor(store: IStore) {
        store.subscribe(this.logChange);
    }

    //this function will be inserted
    private logChange = (key: string, oldValue: any, newValue: any): void => {
        this.changeLog.push({ key, oldValue, newValue });
    };

    public getChangeLog(): Array<{ key: string; oldValue: any; newValue: any }> {
        return this.changeLog;
    }
}

export default StoreDebugger;