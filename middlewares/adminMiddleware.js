import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";



export const isAdmin = async (req, res, next) => {
    try{
        if(req.user && req.user.role === 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
   
      next();
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
    
};

export const protect = async (req, res, next) => {
     let token;
     if (req.headers.autherization && req.headers.autherization.startsWith('Bearer')) {
        try {
            token = req.headers.autherization.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-passwordHash');
                next();
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorizes, token failed' });
        }
     } else {
        res.status(401).json({ message: 'Not authorized, no token' });
     }
};

export default isAdmin;