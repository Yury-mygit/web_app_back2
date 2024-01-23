import { body, validationResult } from 'express-validator';
import {PaymentStatus, ProductType} from "../../core/models/payment_model";
import ProductModel from "../../core/models/product_model";
class Validator {

    static messegeBylder = (s:string) => {
        return `Validator error: ${s}`
    }

    static validateGetAllPays() {
        return [
            // body('user_id').exists().withMessage(this.messegeBylder('user_id is required')),
            body('user_id').optional().isNumeric().toInt().withMessage(this.messegeBylder(' user_id must be a number')),
            body('user_id').optional().custom((value:number) => value > 0 && value < 1000).withMessage('Validator: user_id must be greater than 0 and less than 1000'),
            body('skip').optional({ nullable: true, checkFalsy: true }).isNumeric().toInt().withMessage('Validator: skip must be a number'),
            body('limit').optional({ nullable: true, checkFalsy: true }).isNumeric().toInt().withMessage('Validator: limit must be a number'),
            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const validProperties = ['user_id', 'skip', 'limit','telegram_id'];
                const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
                if (extraProperties.length) {
                    return res.status(400).json({ errors: `Validator: Invalid properties in request: ${extraProperties.join(', ')}` });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                next();
            }
        ];
    }

    static validate_get_by_telegram_id() {
        return [
            // body('user_id').exists().withMessage(this.messegeBylder('user_id is required')),
            body('telegram_id').isNumeric().toInt().withMessage(this.messegeBylder(' user_id must be a number')),
            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const validProperties = ['telegram_id'];
                const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
                if (extraProperties.length) {
                    return res.status(400).json({ errors: `Validator: Invalid properties in request: ${extraProperties.join(', ')}` });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                next();
            }
        ];
    }

    static validateCreatePay() {
        return [
            body('user_id')
                .optional().isNumeric().toInt().withMessage('user_id must be a number'),
            body('telegram_id')
                .optional().isNumeric().toInt().withMessage('telegram_id must be a number'),
            body('product_id')
                .exists().withMessage('product_id is required')
                .isNumeric().toInt().withMessage('product_id must be a number')
                .custom(async (value) => {
                    const product = await ProductModel.findByPk(value);
                    if (!product) {
                        return Promise.reject('Product with the given product_id does not exist');
                    }
                }),

            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const validProperties = ['user_id', 'telegram_id' , 'product_id'];
                const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
                if (extraProperties.length) {
                    return res.status(400).json({ errors: `Extra field(s) in the request: ${extraProperties.join(', ')}` });
                }
                next();
            }
        ];
    }

    static validateUpdatePay() {
        return [
            body('user_id').exists().withMessage('user_id is required'),
            body('pay_id').exists().withMessage('pay_id is required'),
            body('user_id').isNumeric().toInt().withMessage('id must be a number'),
            body('product_type').exists().withMessage('product_type is required'),
            // body('product_type').custom((value) => Object.values(SubscriptionType).includes(value)).withMessage('Invalid product_type'),
            body('product_type')
                .custom((value) => Object.values(ProductType)
                    // .includes(Number(value)))
                    .includes(value))
                .withMessage('Invalid product_type'),
            body('status')
                .custom((value) => Object.values(PaymentStatus)
                    // .includes(Number(value)))
                    .includes(value))
                .withMessage('Invalid product_type'),


            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const validProperties = ["pay_id", 'user_id', 'product_type', "status"];
                const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
                if (extraProperties.length) {
                    return res.status(400).json({ errors: `Extra field(s) in the request: ${extraProperties.join(', ')}` });
                }
                next();
            }
        ];
    }

    static validateConsumePay() {
        return [
            body('user_id').exists().withMessage('user_id is required'),
            body('user_id').isNumeric().toInt().withMessage('id must be a number'),
            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            },
            (req: any, res: any, next: any) => {
                const validProperties = [ 'user_id'];
                const extraProperties = Object.keys(req.body).filter(prop => !validProperties.includes(prop));
                if (extraProperties.length) {
                    return res.status(400).json({ errors: `Extra field(s) in the request: ${extraProperties.join(', ')}` });
                }
                next();
            }
        ];
    }
    static validateDelete() {
        return [
            body('pay_id').exists().withMessage('Validator: user_id is required'),


        ];
    }
}

export default Validator