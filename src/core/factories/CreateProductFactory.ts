import {ProductAttributes} from "../../subject/product/product_model";

export interface ICreateProductFactory{
    create( payload: Partial<ProductAttributes> ):Partial<ProductAttributes>
}

class CreateUserFactory implements ICreateProductFactory{

    constructor() {
    }
    create( payload: Partial<ProductAttributes> ) {

        return  {
            // product_id: payload.product_id,
            name: payload.name || undefined,
            cost: payload.cost || undefined,
            desc: payload.desc || undefined,
            // createdAt: payload.createdAt,
            // updatedAt: payload.updatedAt,
        }
    }
}

export default CreateUserFactory;
