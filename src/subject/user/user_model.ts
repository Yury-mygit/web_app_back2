import { Sequelize, Table, Column, Model, DataType,  CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import { sequelize } from '../../database/database';
import {UserStatus} from "./user_interface";

export interface IUserModel {
    user_id: number;
    name: string;
    surname: string;
    parents?: string;
    age: number;
    status: UserStatus;
    attendance?: number;
    absences?: number;
    email?: string;
    telephone?: string;
    telegram_notification: boolean;
    telegram_id: number;
    issue: string;
    initial_diagnosis_date?: string;
    address: string;
    found_through: string;
    online: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;

    // If there are any instance methods, include them here as well.
    // methodName(param1: Type1, param2: Type2): ReturnType;
}

@Table({ tableName: 'users' })
export class User_model extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    user_id!: number;

    @AllowNull(false)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    surname!: string;

    @AllowNull(true)
    @Column
    parents!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    age!: number;

    @AllowNull(false)
    @Column(DataType.ENUM('active', 'inactive'))
    status!: UserStatus;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    attendance!: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    absences!: number;

    @AllowNull(true)
    @Column
    email!: string;

    @AllowNull(true)
    @Column
    telephone!: string;

    @Default(false)
    @Column
    telegram_notification!: boolean;

    @Column(DataType.BIGINT)
    telegram_id!: number;

    @Column(DataType.TEXT)
    issue!: string;

    @AllowNull(true)
    @Column
    initial_diagnosis_date!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    address!: string;

    @Column(DataType.TEXT)
    found_through!: string;

    @Default(false)
    @Column
    online!: boolean;

    @Column(DataType.TEXT)
    notes!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}



sequelize.addModels([User_model]);

export default User_model;