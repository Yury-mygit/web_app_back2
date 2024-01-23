interface UserAttributes {
    user_id: number;
    name: string;
    surname: string;
    parents?: string;
    age: number;
    status: UserStatus;
    attendance?: number;
    absences?: number;
    email?: string;
    telephone?: string;
    telegram_notification: boolean;
    telegram_id: number;
    issue: string;
    initial_diagnosis_date?: string;
    address: string;
    found_through: string;
    online: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;

    // If there are any instance methods, include them here as well.
    // methodName(param1: Type1, param2: Type2): ReturnType;
}

enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}


export default UserAttributes
export {UserStatus}