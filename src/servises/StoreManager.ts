import Store from './Store';

class StoreDebugger {
    private storeID: string;
    private changeLog: Array<{ key: string; oldValue: any; newValue: any }> = [];

    constructor(storeID: string, store: Store) {
        this.storeID = storeID;
        store.subscribe(this.logChange);
    }

    private logChange = (key: string, oldValue: any, newValue: any): void => {
        const changeRecord = { key, oldValue, newValue };
        this.changeLog.push(changeRecord);
        console.log(`${this.storeID}: ${key} - was - ${oldValue} - became - ${newValue}`);
    };

    public getChangeLog(): Array<{ key: string; oldValue: any; newValue: any }> {
        return this.changeLog;
    }
}

export default StoreDebugger;