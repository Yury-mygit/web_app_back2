import { Response } from 'express';
import User_model from "../../user/user_model";

const req_validate_and_configure_input_data = async (user_id: number | undefined, telegram_id: number | undefined, product_id: number) => {

    if (!user_id && !telegram_id) throw new Error("For adding pay need to provide or user_id or telegram_id")

    if (user_id && telegram_id) {
        const user = await User_model.findOne({
            where: {
                user_id: user_id
            },
            attributes: ['user_id', 'telegram_id']
        });

        if (!user || Number(telegram_id) !== Number(user.telegram_id)) {
            if (!user) throw new Error(`Нет пользователя с таким id ${user_id}`)
            throw new Error(`User with identifier ${user_id} has a different Telegram identifier ${user.telegram_id}`);
        }
    }

    if (!user_id && telegram_id) {
        const user = await User_model.findOne({
            where: {
                telegram_id: telegram_id
            },
            attributes: ['user_id']
        });

        if (!user)  throw new Error(`There is no user with telegram_id=${telegram_id}`);

        user_id = user.user_id;
    }

    return {user_id:user_id!, product_id};
}

export default req_validate_and_configure_input_data