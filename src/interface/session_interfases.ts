
interface SessionAttributes {
    id?: number;
    startDateTime: string;
    duration: number;
    week_first_day: string;
    online: boolean;
    paid: boolean;
    confirmed: boolean;
    student_id: number;
    employee_id: number;
    repeatable: boolean;
    notes: string;
    office_id: number;
    performed: boolean;
    serviceType: ServiceType;
    status: Status;
    payment_id: number;
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