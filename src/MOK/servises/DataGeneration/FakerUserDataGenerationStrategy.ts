import {faker} from "@faker-js/faker";
import IDataGenerationStrategy from "./IDataGenerationStrategy";
import {UserCreationAttributes, UserStatus} from "../../../interface/user_interface";

class FakerUserDataGenerationStrategy implements IDataGenerationStrategy {
    generateUserData(telegramId: number): UserCreationAttributes {
        return {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            parents: faker.person.firstName(),
            age: faker.number.int({min: 3, max: 50}),
            status: UserStatus.ACTIVE,
            attendance: 0.05,
            absences: 0.02,
            email: faker.internet.email(),
            telephone: faker.phone.number(),
            telegram_id: telegramId,
            issue:'Постановка звука Р',
            initial_diagnosis_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            address: faker.location.streetAddress()
        };
    }
}

export default FakerUserDataGenerationStrategy