import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import {sequelize} from "../database/database";
import Student from "./Student";

@Table({tableName:'office'})
class Office extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    address!: string;
}

sequelize.addModels([Office]);

export default  Office