
import UserAttributes from "../models/user_model";
// import {ICreateUserFactory} from "../../subject/user/UserService";

export interface ICreateUserFactory {
    create( payload: Partial<UserAttributes> ):Partial<UserAttributes>
    update( payload: Partial<UserAttributes> ):Partial<UserAttributes>
}

class UserFactory implements ICreateUserFactory{

    constructor() {
    }
    create( payload: Partial<UserAttributes> ) {

        return  {
            // user_id: payload.user_id,
            name: payload.name || undefined,
            surname: payload.surname || undefined,
            parents: payload.parents || undefined,
            age: payload.age || undefined,
            status: payload.status || undefined,
            attendance: payload.attendance || undefined,
            absences: payload.absences || undefined,
            email: payload.email || undefined,
            telephone: payload.telephone || undefined,
            telegram_notification: payload.telegram_notification || undefined,
            telegram_id: payload.telegram_id  || undefined,
            issue: payload.issue  || undefined,
            initial_diagnosis_date: payload.initial_diagnosis_date  || undefined,
            address: payload.address  || undefined,
            found_through: payload.found_through  || undefined,
            online: payload.online  || undefined,
            notes: payload.notes  || undefined,
            // createdAt: payload.createdAt,
            // updatedAt: payload.updatedAt,
        }
    }

    public update( payload: Partial<UserAttributes> ) {
        console.log(payload)
        return  {
            user_id: payload.user_id,
            name: payload.name || undefined,
            surname: payload.surname || undefined,
            parents: payload.parents || undefined,
            age: payload.age || undefined,
            status: payload.status || undefined,
            attendance: payload.attendance || undefined,
            absences: payload.absences || undefined,
            email: payload.email || undefined,
            telephone: payload.telephone || undefined,
            telegram_notification: payload.telegram_notification || undefined,
            telegram_id: payload.telegram_id  || undefined,
            issue: payload.issue  || undefined,
            initial_diagnosis_date: payload.initial_diagnosis_date  || undefined,
            address: payload.address  || undefined,
            found_through: payload.found_through  || undefined,
            online: payload.online  || undefined,
            notes: payload.notes  || undefined,
            // createdAt: payload.createdAt,
            // updatedAt: payload.updatedAt,
        }
    }
}

export default UserFactory;
