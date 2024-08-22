import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
   const token = jwt.sign(
    {email: email, role: role },
    process.env.JWT_SECRET,
    {expiresIn: '1h' }
   );
   return token;
    };

    