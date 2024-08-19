import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';




// Signup (User registration)
export const signup = async ( req, res) => {
    const { username , email, password, role } = req.body;

    try {
        const existitngUser = await User.findOne({ email });
        if (existitngUser) {
            return res.status(400).json({ error: 'User already exists', code: 'USER_EXISIS' });
        }
const hashedPassword = await bcrypt.hash(password, 10);           
const newUser = new User({ username, email, passwordHash: hashedPassword, role});
 await newUser.save();

 const token = generateToken(newUser);
     res.status(201).json({ token });
    } catch (error) {
        console.error('Signup error:', error.message); // Log the error
        res.status(500).json({ error: 'Server error', code:'SERVER_ERROR' });
        }
};

// Sign in (User login)

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(400).json({ error: "Invalid credentials" , code: 'INVALID_CREDENTIALS' }); // Check if the user exists
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch(error) {
        console.log('Login error:', error.message); // Log the error
        res.status(500).json({ error: 'Server error', code: 'SERVER_ERROR' });
        }
    };

         export const refreshToken = (req, res) => {
            const token = req.headers.authorization?.split('')[1];
            if(!token){
                return res.status(401).json({ error: 'Refresh token required', code: 'TOKEN_REQUIRED' });
            } 
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const newToken = generateToken({_id: decoded.userId, role: decoded.role });
                res.status(200).json({ token: newToken });            }
            catch (error) {
                res.status(401).json({ error: 'Invalid token ', code: 'INVALID_TOKEN'});           
             }

         };
     

// Logout (User logout)

export const logout = (req, res) => {
    res.status(200).json({ message: ' Logged out successfully ' });
}
;