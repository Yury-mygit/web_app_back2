import { Model, Column, Table, AutoIncrement, PrimaryKey, AllowNull, DataType, ForeignKey } from 'sequelize-typescript';
import  User_model  from './user/user_model';
import  Employee_model  from './employee_model';
import  Office_model  from './office_model';
import  Payment_model  from './payment_model';
import {sequelize} from "../database/database";

export enum ServiceType {
    mas = 'Логопедический массаж',
    log = 'Логопедическое занятие',
}

export enum Status {
    active = 'active',
}

export interface I_Session {
    id?: number;
    startDateTime: string;
    duration: number;
    week_first_day: string;
    online: boolean;
    paid: boolean;
    confirmed: boolean;
    student_id: number;
    employee_id: number;
    repeatable: boolean;
    notes: string;
    office_id: number;
    performed: boolean;
    serviceType: ServiceType;
    status: Status;
    payment_id: number;
}

@Table({ tableName: 'session' })
class SessionModel extends Model {
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

    @ForeignKey(() => User_model)
    @Column
    student_id!: number;

    @ForeignKey(() => Employee_model)
    @Column
    employee_id!: number;

    @AllowNull(false)
    @Column
    repeatable!: boolean;

    @AllowNull(false)
    @Column(DataType.TEXT)
    notes!: string;

    @ForeignKey(() => Office_model)
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

    @ForeignKey(() => Payment_model)
    @Column
    payment_id!: number;
}

sequelize.addModels([SessionModel]);

export default SessionModel;