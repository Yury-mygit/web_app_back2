import { Model, Column, Table, AutoIncrement, PrimaryKey, AllowNull, DataType, ForeignKey } from 'sequelize-typescript';
import  Student  from './Student';
import  Employee  from './Employee';
import  Office  from './Office';
import  Payment  from './Payment';
import {sequelize} from "../database/database";

enum ServiceType {
    // Define your service types here
}

enum Status {
    // Define your statuses here
}

@Table({ tableName: 'session' })
class Session extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    startDateTime!: string;

    @AllowNull(false)
    @Column
    duration!: number;

    @AllowNull(false)
    @Column
    week_first_day!: string;

    @AllowNull(false)
    @Column
    online!: boolean;

    @AllowNull(false)
    @Column
    paid!: boolean;

    @AllowNull(false)
    @Column
    confirmed!: boolean;

    @ForeignKey(() => Student)
    @Column
    student_id!: number;

    @ForeignKey(() => Employee)
    @Column
    employee_id!: number;

    @AllowNull(false)
    @Column
    repeatable!: boolean;

    @AllowNull(false)
    @Column(DataType.TEXT)
    notes!: string;

    @ForeignKey(() => Office)
    @Column
    office_id!: number;

    @AllowNull(false)
    @Column
    performed!: boolean;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(ServiceType)))
    serviceType!: ServiceType;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(Status)))
    status!: Status;

    @ForeignKey(() => Payment)
    @Column
    payment_id!: number;
}

sequelize.addModels([Session]);

export default Session;