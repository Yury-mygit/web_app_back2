import { IsDefined,  IsOptional, IsNumber, IsString, IsBoolean, ValidateNested ,IsDate} from 'class-validator';
import {UserStatus} from "../../../interface/user_interface";
import UserAttributes from "../../../interface/user_interface";

class UserResponse {
    // @IsNumber()
    // user_id!: number;
    //
    @IsString()
    name!: string;
    //
    @IsString()
    surname!: string;
    //
    @IsNumber()
    age!: number; // Make sure this is a number, not a string
    //
    @IsString()
    address!: string;
    //
    @IsString()
    status!: UserStatus;
    //
    // @IsDate()
    // updatedAt!:  Date;
    // // //
    // @IsDate()
    // createdAt!: Date;
    // //


    @IsNumber()
    attendance!: number;
    //
    @IsNumber()
    absences!: number;

    @IsString()
    email!: string;

    @IsString()
    telephone!: string;

    @IsOptional()
    @IsNumber()
    telegram_id?: number;

    @IsOptional()
    @IsString()
    issue?: string;

    @IsOptional()
    @IsDate()
    initial_diagnosis_date?: Date;

    @IsOptional()
    @IsString()
    found_through?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsBoolean()
    telegram_notification?: boolean;

    @IsOptional()
    @IsBoolean()
    online?: boolean;

    @IsOptional()
    @IsString()
    parents?: string;

    constructor(partial: Partial<UserAttributes>) {
        Object.assign(this, partial);
        // console.log(Object.assign(this, partial))
    }
}

export default UserResponse;


// class UserResponse {
//
//     // constructor(payload:{
//     //     user_id: number
//     //     name: string
//     //     surname: string
//     //     age: string
//     //     address: string
//     //     status:UserStatus
//     //     updatedAt:Date
//     //     createdAt:Date
//     //     parents: string
//     //     attendance: number
//     //     absences: number
//     //     email: string
//     //     telephone: string
//     //     telegram_id: number
//     //     issue: string
//     //     initial_diagnosis_date:Date
//     //     found_through: string
//     //     notes: string
//     //     telegram_notification: boolean;
//     //     online: boolean;
//     // }
//     // ) {
//     //     this.user_id = payload.user_id
//     //     this.name = payload.name
//     //     this.surname = payload.surname
//     //     this.age = payload.age
//     //     this.address = payload.address
//     //     this.status = payload.status
//     //     this.updatedAt = payload.updatedAt
//     //     this.createdAt = payload.createdAt
//     //     this.parents = payload.parents
//     //     this.attendance = payload.attendance
//     //     this.absences = payload.absences
//     //     this.email = payload.email
//     //     this.telephone = payload.telephone
//     //     this.telegram_id = payload.telegram_id
//     //     this.issue = payload.issue
//     //     this.initial_diagnosis_date = payload.initial_diagnosis_date
//     //     this.found_through = payload.found_through
//     //     this.notes = payload.notes
//     //     this.telegram_notification = payload.telegram_notification
//     //     this.online = payload.online
//     // }
//
//     @IsNumber()
//     user_id: number;
//
//     @IsString()
//     name: string;
//
//     @IsString()
//     surname: string;
//
//     @IsNumber()
//     age: string;
//
//     @IsString()
//     address: string;
//
//     @IsString()
//     status:UserStatus
//
//     @IsString()
//     updatedAt
//
//     @IsString()
//     createdAt
//
//     @IsString()
//     parents
//
//     @IsNumber()
//     attendance
//
//     @IsNumber()
//     absences
//
//     @IsString()
//     email
//
//     @IsString()
//     telephone
//
//     @IsNumber()
//     telegram_id
//
//     @IsString()
//     issue
//
//     @IsString()
//     initial_diagnosis_date
//
//     @IsString()
//     found_through
//
//     @IsString()
//     notes
//
//     @IsBoolean()
//     telegram_notification: boolean;
//
//     @IsBoolean()
//     online: boolean;
//     constructor(partial: Partial<UserResponse>) {
//         Object.assign(this, partial);
//     }
//
// }

// export default UserResponse



