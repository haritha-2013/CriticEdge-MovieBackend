import jwt from 'jsonwebtoken' ;
import User from '../models/userModel.js';


// Middlewares are used to protect routes and role based access control
// To authenticate users
export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied"});
    }

try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded;// Pins the user to request object
        next();
     } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
        }

    };


    //Middleware to authorize users based on their roles
   export const authorize = (roles = []) => {
       return (req, res, next) => {
            if(!roles.includes(req.user.role)) {
               return res.status(403).json({ message: 'Forbidden' });
           }
           next();
       };
  };


const authMiddleware = { authenticate, authorize }; // Export as a single object

export default authenticate;