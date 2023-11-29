import { Sequelize, Table, Column, Model, DataType,  CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull, Unique, Default } from 'sequelize-typescript';
import { sequelize } from '../database/database';
enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Table({ tableName: 'students' })
export class Student extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    firstName!: string;

    @AllowNull(false)
    @Column
    lastName!: string;

    @AllowNull(false)
    @Column
    parentsName!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    age!: number;

    @AllowNull(false)
    @Column(DataType.ENUM('active', 'inactive'))
    status!: Status;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    sessionTransferRate!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    percentageOfAbsences!: number;

    @AllowNull(false)
    @Unique
    @Column
    contactEmail!: string;

    @AllowNull(false)
    @Column
    contactTelephone!: string;

    @Default(false)
    @Column
    allowTelegramNotification!: boolean;

    @Column(DataType.BIGINT)
    telegramId!: number;

    @Column(DataType.TEXT)
    issue!: string;

    @AllowNull(false)
    @Column
    dateOfInitialDiagnosis!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    address!: string;

    @Column(DataType.TEXT)
    foundUsThrough!: string;

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

// Student.init(
//     {
//         // Define your model attributes here
//         firstName: DataType.STRING,
//         lastName: DataType.STRING,
//         parentsName: DataType.STRING,
//         status: DataType.STRING,
//         sessionTransferRate: DataType.NUMBER,
//         percentageOfAbsences: DataType.STRING,
//         contactEmail: DataType.STRING,
//         contactTelephone: DataType.STRING,
//         allowTelegramNotification: DataType.BOOLEAN,
//         telegramId: DataType.NUMBER,
//         issue: DataType.STRING,
//         dateOfInitialDiagnosis: DataType.STRING,
//         address: DataType.STRING,
//         foundUsThrough: DataType.STRING,
//         online: DataType.BOOLEAN,
//         notes: DataType.STRING,
//         createdAt: DataType.DATE,
//         updatedAt: DataType.DATE
//     },
//     {
//         sequelize, // Pass the sequelize instance to the model
//         modelName: 'Student', // Set the model name
//     }
// );

sequelize.addModels([Student]);

export default Student;