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

export enum SubscriptionType {
    ONE_LESSON = 1,
    FOUR_LESSONS = 4,
    EIGHT_LESSONS = 8
}

export interface PayAttributes{
    id: number;
    student_id: number;
    status: PaymentStatus;
    pay_type: SubscriptionType
}

export interface PayCreationAttributes extends Optional<PayAttributes, 'id'> {}

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
    @Column
    get pay_type(): SubscriptionType {
        return this.getDataValue('subscription_type');
    }

    set subscription_type(value: SubscriptionType) {
        this.setDataValue('subscription_type', value);
    }

}

sequelize.addModels([PaymentModel])

export default PaymentModel