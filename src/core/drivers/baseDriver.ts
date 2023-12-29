import IStore from '../store'
import answerFilter from "../filter/UserAnswerFilter";

export interface IBaseEntity {
    configureStore(store_: IStore) :void
    // validate(): void
    sayHello():void
    // configureStore
    save({ model, data }: { model: any, data: any }): Promise<any>;
    answer(data: any, filter: string[]): any

    answerBuild(data: any) :any;
    dto:any
    factory:any
    model:any
    answerFilter: any
}

abstract class BaseDriver implements IBaseEntity{
     store!: IStore;
     dto:any = undefined
     factory:any = undefined
     model:any = undefined
     answerFilter:any = undefined

    public configureStore(store_: IStore): void {
        this.store = store_;
    }

    // public abstract validate(): void;
    public sayHello = () => {
        console.log("Hello from user")
    }



    public save = async ({model, data} : {model: any, data:any}) => {
        try {
            const answer:any = await model.create(data);
            return answer.dataValues

        } catch (error: any) {
            throw new Error('Error')
        }
    }

    public answerBuild =  (data:any) =>{
         return this.answerFilter.build(data)
    }

    public answer = (data: any, filter: string[]) => {
        const filteredData: any = {};
        filter.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                filteredData[field] = data[field];
            }
        });
        return filteredData;
    }

}

export default BaseDriver