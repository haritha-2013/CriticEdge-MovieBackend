import User from '../models/userModel.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    const { username, bio, profilePicture } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
        { username, bio, profilePicture },
    { new: true }        
        );

    res.status(200).json(updatedUser);
} catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users

export const getAllUsers = async (req, res) => {
    try {

        // Get all users from the database
        const users = await User.find();

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: err.message});
    } // err represents the error object with details about what went wrong. and give as error message details
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        // Get a user by ID from the database
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message});    
    }
};

// Update a user by ID
export const updateUserByid = async (req, res) => {
    try {
        // Get update details from req.body
        const { username, email, passwordHash, role, profilePicture, bio} = req.body;
    
        // Update user by ID
        const updatedUser = await User.findByIdAndUpdate(
           req.params.userId,
           { username, email, passwordHash, role, profilePicture, bio},
           { new: true} // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
        
    
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
    try {
        // Delete the user by ID
        const deletedUser = await User.findByIdAndDelete(req.params.userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'});
            }

            res.status(200).json({ message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }

};


