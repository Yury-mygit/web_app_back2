import BaseDriver, {IBaseEntity} from "./baseDriver";


interface IPaymentDriver extends IBaseEntity{

}


class PaymentDriver extends BaseDriver implements IPaymentDriver{
    // public validate() {
    //     console.log('validate Payment')
    // }
}

export default PaymentDriver
export {IPaymentDriver}