import {Optional} from "sequelize";

interface UserAttributes {
    user_id: number;
    name: string;
    surname: string;
    parents: string;
    age: number;
    status: UserStatus;
    attendance: number;
    absences: number;
    email: string;
    telephone: string;
    telegram_notification?: boolean;
    telegram_id?: number;
    issue: string;
    initial_diagnosis_date: string;
    address: string;
    found_through?: string;
    online?: boolean;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
// found_through, online, notes, createdAt, updatedAt

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export default UserAttributes

// export interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'updatedAt' | 'createdAt'>{}
export interface UserCreationAttributes extends Partial<UserAttributes> {}