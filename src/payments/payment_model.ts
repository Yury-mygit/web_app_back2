import {
    Model,
    Column,
    Table,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { User_model } from '../models/user/user_model';
import { Optional } from 'sequelize';
import {sequelize} from "../database/database";
import ProductModel from "../models/product_model";

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
    product_id: number;
    spend:number
}
export interface PayCreationAttributes extends Optional<PayAttributes, 'pay_id'> {}

@Table({ tableName: 'payment' })
export default class PaymentModel extends Model<PayAttributes, PayCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column
    pay_id!: number;

    // @ForeignKey(() => User_model)
    @Column
    user_id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM({values: Object.values(PaymentStatus)}))
    status!: PaymentStatus;

    @AllowNull(false)
    @Column
    spend!: number;

    @ForeignKey(() => ProductModel)
    @Column
    product_id!: number;

    @BelongsTo(() => ProductModel)
    product?: ProductModel;
}

sequelize.addModels([ProductModel, PaymentModel]);

// export default PaymentModel