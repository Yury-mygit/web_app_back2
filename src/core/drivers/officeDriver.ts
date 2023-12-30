import BaseDriver, {IBaseEntity} from "./baseDriver";

interface IOfficeDriver extends IBaseEntity{

}

class OfficeDriver extends BaseDriver implements IOfficeDriver{
    sayHello = () => {
        console.log("Hello from Office")
    }
    // public validate() {
    //     console.log('validate Payment')
    // }
}


export default OfficeDriver
export {IOfficeDriver}