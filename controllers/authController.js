import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const JWT_SECRET = process.env.JWT_SECRET;


export const generateToken = (user) => {
    const token = jwt.sign(
        { userId: user._id, role: user.role },
   JWT_SECRET,
     {expiresIn: '1h' }
    );
    return token;
     };
 

// Signup (User registration)
export const signup = async ( req, res) => {
   
    try {
        const { username , email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, passwordHash: hashedPassword, role });
        await user.save();
    
        const token = generateToken(user);
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none'
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch(error){
        console.log(('Signup error:'), error.message);
        res.status(500).json({ error: 'Server error', code: 'SERVER_ERROR' });
    }
};

// Sign in (User login)

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' , code: 'INVALID_CREDENTIALS' });
                 // Check if the user exists
        }

        const passwordMatch = bcrypt.compare(data.password, user.password)
        
        if (passwordMatch) {
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
        
        });
    }
        res.status(200).json({ message: 'Logged in successfully' });
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
                const decoded = jwt.verify(token, JWT_SECRET);
                const newToken = generateToken({_id: decoded.userId, role: decoded.role });
                res.cookie('token', newToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite:'none'
                });
                res.status(200).json({ token: newToken });            }
            catch (error) {
                res.status(401).json({ error: 'Invalid token ', code: 'INVALID_TOKEN'});           
             }

         };
     

// Logout (User logout)

export const logout = (req, res) => {
    res.cookie('token', '',{
       expires: new Date(0),
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'none'
    });
    res.status(200).json({ message: ' Logged out successfully ' });
};

