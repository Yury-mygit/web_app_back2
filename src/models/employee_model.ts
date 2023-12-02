import { Model, Column, Table, AutoIncrement, PrimaryKey, AllowNull, DataType } from 'sequelize-typescript';
import {sequelize} from "../database/database";

enum Status {
    'active' =0,
}

@Table({ tableName: 'employee' })
class Employee_model extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.keys(Status)))
    status!: Status;

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