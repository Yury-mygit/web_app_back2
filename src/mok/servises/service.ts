import {faker} from "@faker-js/faker";
import {IService, IWorkspace} from "../fake_controller";
// import Log from "../../servises/debug";
import IDataGenerationStrategy from "./DataGeneration/IDataGenerationStrategy";

class Service implements IService{
    private dataGenerationStrategy: IDataGenerationStrategy;
    private workspace !:IWorkspace
    constructor( dataGenerationStrategy: IDataGenerationStrategy) {
        this.dataGenerationStrategy = dataGenerationStrategy;
    }

    public connectWorkspace = (ws:any)=>{
        this.workspace = ws
        // Log('workspace is bound to service')
    }

    public getUserIdList_2 = (userCount: number, telegramIds: number[]):number[] => {

        let t_ids:number[] = telegramIds
        const baseIdLength = t_ids[0].toString().length;

        for (let i = 2; i < userCount; i++) {
            let randomId = faker.number.int({ min: Math.pow(10, baseIdLength), max: Math.pow(10, baseIdLength + 1) - 1 });
            t_ids.push(randomId);
        }
        return t_ids
    }
    public getUserIdList_ = (userCount: number, flag:string):number[] => {

        let t_ids:number[] = this.workspace.getData(flag)
        const baseIdLength = t_ids[0].toString().length;

        for (let i = 2; i < userCount; i++) {
            let randomId = faker.number.int({ min: Math.pow(10, baseIdLength), max: Math.pow(10, baseIdLength + 1) - 1 });
            t_ids.push(randomId);
        }

        this.workspace.setData("ids", t_ids)
        // console.log(this.workspace.getData('ids'))
        return t_ids
    }

    public getUserIdList = (userCount: number, flag:string):number[] => {

        let t_ids:number[] = this.workspace.getData(flag)
        const baseIdLength = t_ids[0].toString().length;

        for (let i = 2; i < userCount; i++) {
            let randomId = faker.number.int({ min: Math.pow(10, baseIdLength), max: Math.pow(10, baseIdLength + 1) - 1 });
            t_ids.push(randomId);
        }

        this.workspace.setData("ids", t_ids)
        // console.log(this.workspace.getData('ids'))
        return t_ids
    }
}

export default Service