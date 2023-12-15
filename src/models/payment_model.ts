import {
    Model,
    Column,
    Table,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    DataType,
    ForeignKey
} from 'sequelize-typescript';
import { User_model } from './user/user_model';
import { Optional } from 'sequelize';
import {sequelize} from "../database/database";

export enum PaymentStatus {
    NEW = "new",
    ACTIVE = "active",
    SPENT = "spent"
}

export enum ProductType {
    subscription_1 = "1",
    subscription_4 = "4",
    subscription_8 = "8"
}

export interface PayAttributes{
    pay_id: number;
    user_id: number;
    status: PaymentStatus;
    product_type: ProductType;
    spend:number
}
export interface PayCreationAttributes extends Optional<PayAttributes, 'pay_id'> {}

@Table({ tableName: 'payment' })
class PaymentModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    pay_id!: number;

    @ForeignKey(() => User_model)
    @Column
    user_id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM({values: Object.values(PaymentStatus)}))
    status!: PaymentStatus;

    @AllowNull(false)
    @Column(DataType.STRING)
    get product_type(): ProductType {
        return this.getDataValue('product_type');
    }

    @AllowNull(false)
    @Column
    spend!: number;

    set product_type(value: ProductType) {
        this.setDataValue('product_type', value);
    }

}

sequelize.addModels([PaymentModel])

export default PaymentModel