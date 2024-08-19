import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
   const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {expiresIn: '1h' }
   );
   return token;
    };

    