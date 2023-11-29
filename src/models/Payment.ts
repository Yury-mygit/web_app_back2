import { Model, Column, Table, AutoIncrement, PrimaryKey, AllowNull, DataType, ForeignKey } from 'sequelize-typescript';
import { Student } from './Student';

enum PaymentStatus {
    NEW = "new",
    ACTIVE = "active",
    SPENT = "spent"
}

enum SubscriptionType {
    ONE_LESSON = 1,
    FOUR_LESSONS = 4,
    EIGHT_LESSONS = 8
}

@Table
class Payment extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => Student)
    @Column
    student_id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM({values: Object.values(PaymentStatus)}))
    status!: PaymentStatus;

    @AllowNull(false)
    @Column
    get subscription_type(): SubscriptionType {
        return this.getDataValue('subscription_type');
    }

    set subscription_type(value: SubscriptionType) {
        this.setDataValue('subscription_type', value);
    }

}

export {Payment}