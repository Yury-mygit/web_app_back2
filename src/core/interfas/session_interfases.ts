
interface SessionAttributes {
    session_id?: number;
    startDateTime: string;
    duration: number;
    week_first_day: string;
    online: boolean;
    paid: boolean;
    confirmed: boolean;
    user_id: number;
    staff_id: number;
    repeatable: boolean;
    notes: string;
    office_id: number;
    performed: boolean;
    serviceType: ServiceType;
    status: Status;
    payment_id?: number;
}


export enum ServiceType {
    mas = 'Логопедический массаж',
    log = 'Логопедическое занятие',
}

export enum Status {
    active = 'active',
}



export default SessionAttributes

export interface SessionCreationAttributes extends Partial<SessionAttributes>{}
export interface PartialSessionAttributes extends Partial<SessionAttributes>{}