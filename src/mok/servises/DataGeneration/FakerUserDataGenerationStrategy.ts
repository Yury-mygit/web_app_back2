import {faker} from "@faker-js/faker";
import IDataGenerationStrategy from "./IDataGenerationStrategy";
import {UserCreationAttributes, UserStatus} from "../../../subject/user/user_interface";

class FakerUserDataGenerationStrategy implements IDataGenerationStrategy {
    generateUserData(telegramId: number): UserCreationAttributes {

        // console.log(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        const initial_diagnosis_date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        // console.log(typeof initial_diagnosis_date)
        return {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            parents: faker.person.firstName(),
            age: faker.number.int({min: 3, max: 50}),
            status: UserStatus.ACTIVE,
            attendance: 0.05,
            absences: 0.02,
            email: faker.internet.email(),
            telephone: faker.phone.number().toString(),
            telegram_id: telegramId,
            issue:'Постановка звука Р',
            initial_diagnosis_date: initial_diagnosis_date.toISOString(),
            address: faker.location.streetAddress()
        };
    }
}

export default FakerUserDataGenerationStrategy