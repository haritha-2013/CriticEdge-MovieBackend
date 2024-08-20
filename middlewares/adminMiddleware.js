import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

// Authentication middleware
export const protect = async (req, res, next) => {
     const token = req.cookies.token; // Extract token from cookies
     if (token){
         try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user= await User.findById(decoded.userId).select('-passwordHash') 
            if(!req.user) {
                return res.status(401).json({ message: 'User not found' });           
             }
             next();
            } catch(error) {
                console.error('Token verification error:', error.message);
          res.status(401).json({ message: 'Not authorized, token failed' });
        }
     } else {
        res.status(401).json({ message: 'Not authorized, no token' });
     }
};

// Admin check middleware
export const isAdmin =  (req, res, next) => {
    
    if(req.user && req.user.role === 'admin') {
        next();
    }else{
        return res.status(403).json({ message: 'Admin access required' });
    }
    
};

export default isAdmin;