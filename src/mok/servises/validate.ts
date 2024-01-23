import { IsDefined,  IsOptional, IsNumber, IsString, IsBoolean, ValidateNested ,IsDate} from 'class-validator';
import UserAttributes, {UserStatus} from "../../core/interfas/userAtributes";

class UserResponse{
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
    @IsString()
    initial_diagnosis_date?: string;

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
    }
}

export default UserResponse;



