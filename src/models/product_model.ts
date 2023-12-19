import {
    Model,
    Column,
    Table,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    DataType,
    HasMany,
    HasOne
} from 'sequelize-typescript';
import {sequelize} from "../database/database";
import PaymentModel from "../payments/payment_model";

export enum ProductType {
    subscription = 'subscription',
    product = 'product',
}

export interface ProductAttributes{
    product_id: number;
    product_type: ProductType;
    name:string;
    desc: number;

    }

@Table({ tableName: 'product' })
export default class ProductModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    product_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    get product_type(): ProductType {
        return this.getDataValue('product_type');
    }

    @AllowNull(false)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    cost!: number;

    @AllowNull(false)
    @Column
    desc!: string;

    set product_type(value: ProductType) {
        this.setDataValue('product_type', value);
    }

    // In ProductModel class
    // @HasMany(() => PaymentModel)
    // payments?: PaymentModel[];

}

sequelize.addModels([ProductModel])

// export default ProductModel