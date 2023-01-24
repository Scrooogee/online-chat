import { body } from "express-validator";

export const RegValidation = [
    body('email', 'Input email').isEmail(),
    body('userName', 'Create the uniqe User name').isString().isLength({min: 3}),
    body('name', 'Input your real name').isString(),
    body('password', 'password should be min 5 symbols').isLength({min: 5})
]