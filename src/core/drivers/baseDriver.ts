import IStore from '../store'

export interface IBaseEntity {
    configureStore(store_: IStore) :void
    validate(): void
    sayHello():void
    // configureStore
    dto:any
    factory:any
    model:any
}

abstract class BaseDriver implements IBaseEntity{
     store!: IStore;
     dto:any = undefined
     factory:any = undefined
    model:any = undefined

    public configureStore(store_: IStore): void {
        this.store = store_;
    }

    public abstract validate(): void;
    public sayHello = () => {
        console.log("Hello from user")
    }
}

export default BaseDriver