import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'


// Create a new user (Admin only)
export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
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



// Get all user (Admin only)
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
