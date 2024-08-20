import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
 
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
         required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String
    },
    joinedDate: {
        type: Date, 
        default: Date.now
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
}); // Hash the passwrod before saving the user model


UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
    
}; // Compare passwrod

const User = mongoose.model('User', UserSchema);

export default User;