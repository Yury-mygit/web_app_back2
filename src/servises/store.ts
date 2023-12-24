// import {IWorkspace} from "../mok/fake_controller";

export interface IStore {
    setData(key: string, data: any):void;
    getData(key: string):any;
    getAllKeys():string[];
    setMultipleData(keyValuePairs: Record<string, any>): void;
    subscribe(observer: (key: string, oldValue: any, newValue: any) => void): void
}
class Store implements IStore{
    private storage: Record<string, any>;
    private observers: Array<(key: string, oldValue: any, newValue: any) => void>;
    constructor() {
        this.storage = {};
        this.observers = [];
    }


    public subscribe(observer: (key: string, oldValue: any, newValue: any) => void): void {
        this.observers.push(observer);
    }

    private notifyObservers(key: string, oldValue: any, newValue: any): void {
        this.observers.forEach(observer => observer(key, oldValue, newValue));
    }


    public setData(key: string, data: any): void {
        const oldValue = this.storage[key];
        this.storage[key] = data;
        this.notifyObservers(key, oldValue, data);
    }

    public getData(key: string): any {
        return this.storage[key];
    }

    public getAllKeys(): string[] {
        return Object.keys(this.storage);
    }

    public setMultipleData(keyValuePairs: Record<string, any>): void {
        Object.entries(keyValuePairs).forEach(([key, value]) => {
            this.setData(key, value);
        });
    }
}

export default Store;