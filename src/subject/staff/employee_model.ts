import { Model, Column, Table, AutoIncrement, PrimaryKey, AllowNull, DataType } from 'sequelize-typescript';
import {sequelize} from "../../database/database";
import {Optional} from "sequelize";

export enum StaffStatus {
    'active' = 0,
}


export interface StaffAttributes {
    staff_id: number;
    status: StaffStatus;
    position: string;
    profession: string;
    first_name: string;
    last_name: string;
    contact_email: string;
    contact_telephone: string;
    telegram_id: number;
    online: boolean;
    offline: boolean;
    qualifications?: string;
    experience_years?: number;
}
export interface StaffCreationAttributes extends Optional<StaffAttributes, 'staff_id'>{}

@Table({ tableName: 'employee' })
class Employee_model extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    staff_id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.keys(StaffStatus)))
    status!: StaffStatus;

    @AllowNull(false)
    @Column
    position!: string;

    @AllowNull(false)
    @Column
    profession!: string;

    @AllowNull(false)
    @Column
    first_name!: string;

    @AllowNull(false)
    @Column
    last_name!: string;

    @AllowNull(false)
    @Column
    contact_email!: string;

    @AllowNull(false)
    @Column
    contact_telephone!: string;

    @AllowNull(false)
    @Column
    telegram_id!: number;

    @AllowNull(false)
    @Column
    online!: boolean;

    @AllowNull(false)
    @Column
    offline!: boolean;

    @AllowNull(true)
    @Column(DataType.TEXT)
    qualifications!: string;

    @AllowNull(true)
    @Column
    experience_years!: number;
}

sequelize.addModels([Employee_model])

export default Employee_model