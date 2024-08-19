import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

// Admin signup

export const signupAdmin = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // Create a new admin user
        user = new User({
            username,
            email,
            passwordHash: await bcrypt.hash(password, 10),
            role: 'admin' 

        });
        await user.save();
        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            username: user.baseModelName,
            email: user.email,
            token // Send token along with response
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user (Admin only)
export const createAdmin = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (role !== 'admin') {
        return res.status(400).json({ message: 'Role must be admin' });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' }); 
        }

        user = new User ({
            username,
            email,
            passwordHash: await bcrypt.hash(password, 10),
            role
        });
        await user.save();
        res.status(201).json({
            user
        });
} catch (error) {
         res.status(500).json({ success: false,  message: 'Server error' });    
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
