import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import {sequelize} from "../database/database";
import Student_model from "./student_model";

@Table({tableName:'office'})
class Office_model extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    address!: string;
}

sequelize.addModels([Office_model]);

export default  Office_model