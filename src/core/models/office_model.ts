import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import {sequelize} from "../../database/database";
import User_model from "./user_model";

export interface OfficeAttributes {
    office_id:number;
    address: string;
}
@Table({tableName:'office'})
class Office_model extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    office_id!: number;

    @AllowNull(false)
    @Column
    address!: string;
}

sequelize.addModels([Office_model]);

export default  Office_model