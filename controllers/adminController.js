import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

// To generate JWT
const generateToken = (user) => {
   return jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET, 
       { expiresIn: '1h'}  
);
};

// Admin signup

export const adminSignup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, passwordHash: hashedPassword, role: 'admin' });
        await user.save();
      
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
    });
            res.status(201).json({ message: 'Admin created successfully' });
        } catch (error) {
            console.error('Signup error:', error.message);
            res.status(500).json({ error: 'Server error!' });
        }

        };

// Admin Login
    export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash)) || user.role !== 'admin') {
            return res.status(400).json({ error: 'Invalid credentials or not admin' });
        }

        const token = generateToken(user);
        res.cookie('token', token, { 
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            //sameSite: 'none' 
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user By ID
export const getUserById = async (req, res) => {
    try { 
        const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });

    }
    res.json(user);
} catch (error) {
    res.status(500).json({ message: 'Server error  '});
}
};



// Delete user (Admin only)

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        res.json({ message: 'User deleted successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Server error'});
    }
};
