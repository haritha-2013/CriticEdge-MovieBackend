import { body, validationResult } from 'express-validator';


// Middleware to validate Signup 
export const validateSignup = [
    body('username')
    .isLength({ min: 3})
    .withMessage('Username must be at least 3 characters'),
    body('email')
    .isEmail()
    .withMessage('Email is not valid'),
    body('password')
    .isLength({ min:6 })
    .withMessage('Password must be at leaste 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();

    }
    

];