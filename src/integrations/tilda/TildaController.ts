/*
Controller for receiving and processing requests from tilde
Basic methods:
tildaWebhook - accepts a request
tildaProcess - saves the payment
 */
import * as fs from 'fs';
class TildaController {
    tildaWebhook = async (req:any, res:any, next:any) => {
        const payload = req.body;

        console.log('Tilda')

        fs.appendFile('webhook-data.txt', JSON.stringify(payload) + "\n", (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ошибка сервера');
                return;
            }

            console.log('Данные сохранены в файл');
            res.status(200).send('Успех');
        });
    }
}

export default new TildaController()