import {
    IsNotEmpty,
    IsEmail,
    IsInt,
    IsNumber,
    Min,
    Max,
    IsOptional,
    IsDate,
    IsString,
    validateSync, isOctal
} from 'class-validator';
import UserAttributes, {UserStatus} from "../interfas/userAtributes";


export interface ICreateUserDTO {
    user_id?: number;
    name?: string;
    surname?: string;
    parents?: string;
    age?: number;
    email?: string;
    telephone?: string;
    initial_diagnosis_date?: string;
    address?: string;
    status?: UserStatus;
    attendance?: number;
    absences?: number;

    validate(payload: Partial<UserAttributes>): CreateUserDTO | null | any
}

export default class CreateUserDTO implements ICreateUserDTO {
    @IsOptional()
    user_id?: number;

    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    surname?: string;

    @IsNotEmpty()
    @IsOptional()
    parents?: string;

    @IsInt()
    @Min(0)
    age?: number;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @IsOptional()
    telephone?: string;

    @IsString()
    @IsOptional()
    initial_diagnosis_date?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsNotEmpty()
    status?: UserStatus;

    @IsNumber()
    @IsOptional()
    attendance?: number;

    @IsNumber()
    @IsOptional()
    absences?: number;

    public validate(payload: Partial<UserAttributes>): CreateUserDTO | null | any {

        Object.assign(this, payload);
        const validationErrors = validateSync(this);

        if (validationErrors.length > 0) {
            return {
                status: 'error',
                data: validationErrors
            };
        }

        return {
            status: 'ok',
            data: this
        };
    }
}



