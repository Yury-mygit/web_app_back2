import {IsNotEmpty, IsEmail, IsInt, IsNumber, Min, Max, IsOptional, IsDate, IsString} from 'class-validator';
import UserAttributes, {UserStatus} from "./user_interface";

export class CreateUserDTO {

    constructor(payload: Partial<UserAttributes>

    ) {
        this.name = payload.name;
        this.surname = payload.surname;
        this.parents = payload.parents;
        this.age = payload.age;
        this.email = payload.email;
        this.telephone = payload.telephone;
        this.initial_diagnosis_date = payload.initial_diagnosis_date;
        this.address = payload.address;
        this.status = payload.status;
        this.attendance = payload.attendance
        this.absences = payload.absences
    }

    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    surname?: string;

    @IsNotEmpty()
    parents?: string;

    @IsInt()
    @Min(0)
    age?: number;

    @IsEmail()
    email?: string;

    @IsNotEmpty()
    telephone?: string;

    @IsString()
    initial_diagnosis_date?: string;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    status?: UserStatus;

    @IsNumber()
    @IsOptional()
    attendance?: number;

    @IsNumber()
    @IsOptional()
    absences?: number;
}




export class UpdateUserDTO {

    constructor(payload:{
            user_id: number,
            firstName: string,
            lastName: string,
            parentsName: string,
            age: number,
            contactEmail: string,
            contactTelephone:string,
            dateOfInitialDiagnosis: Date,
            address: string
        }


    ) {
        this.user_id = payload.user_id;
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.parentsName = payload.parentsName;
        this.age = payload.age;
        this.contactEmail = payload.contactEmail;
        this.contactTelephone = payload.contactTelephone;
        this.dateOfInitialDiagnosis = payload.dateOfInitialDiagnosis;
        this.address = payload.address;
    }


    @IsInt()
    user_id: number;

    @IsOptional()
    @IsNotEmpty()
    firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    lastName?: string;

    @IsOptional()
    @IsNotEmpty()
    parentsName?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsEmail()
    contactEmail?: string;

    @IsOptional()
    @IsNotEmpty()
    contactTelephone?: string;

    @IsOptional()
    @IsNotEmpty()
    dateOfInitialDiagnosis?: Date;

    @IsOptional()
    @IsNotEmpty()
    address?: string;
}
