import { IsNotEmpty, IsEmail, IsInt, Min, Max, IsOptional } from 'class-validator';
import {UserStatus} from "../interface/user_interface";

export class CreateUserDTO {

    constructor(payload:{
                name: string,
                surname: string,
                parentsName: string,
                age: number,
                contactEmail: string,
                contactTelephone:string,
                dateOfInitialDiagnosis: Date,
                address: string,
                status: UserStatus,
                attendance?: number
                }

    ) {
        this.name = payload.name;
        this.surname = payload.surname;
        this.parentsName = payload.parentsName;
        this.age = payload.age;
        this.contactEmail = payload.contactEmail;
        this.contactTelephone = payload.contactTelephone;
        this.dateOfInitialDiagnosis = payload.dateOfInitialDiagnosis;
        this.address = payload.address;
        this.status = payload.status
    }

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    parentsName: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsEmail()
    contactEmail: string;

    @IsNotEmpty()
    contactTelephone: string;

    @IsNotEmpty()
    dateOfInitialDiagnosis: Date;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    status: string;

    @IsOptional()
    attendance?: number;
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
