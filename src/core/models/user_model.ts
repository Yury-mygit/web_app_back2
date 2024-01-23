import { Sequelize, Table, Column, Model, DataType,  CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import { sequelize } from '../../database/database';
import {UserStatus} from "../interfas/userAtributes";

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