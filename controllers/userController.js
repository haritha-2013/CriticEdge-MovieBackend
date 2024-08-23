import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import User  from '../models/userModel.js';
import { generateUserToken } from '../utils/generateToken.js';
import router from '../routes/userRoute.js';

 export const userCreate = async(req, res, next) => {
    try {
        console.log('create route hitted'); 

      const {username,email,password} = req.body;
      if (!username || !email || !password ) {
return res.status(400).json({ success:false , message: "All fields are required" })
      }

      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(404).json({success: false, message: "User already exist" });
      }

        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({username,email,password: hashedPassword });
        await newUser.save();

        // Creating token
      const token = generateUserToken(email);


      res.cookie('token', token);
      res.json({success:true, message: "user created successfully"});
    
    
    } catch (error) {
        res.status(400).json({message:'internalserver'});
 }
 };


  // Login
 export const userLogin = async(req, res, next) => {
    try {
      const {email,password} = req.body;
      if ( !email || !password ) {
return res.status(400).json({ success:false , message: "All fields are required" })
      }
      
      // Compare password
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res.status(404).json({success: false, message: "User does not exist" });
      }
       
      const passwordMatch = bcrypt.compareSync(password,userExist.password); // true
       
      if(!passwordMatch) {
        return res.status(400).json({success: false, message: "User not authenticated" })
      }
       
      
      // Creating token
      const token = generateUserToken(email);
      res.cookie('token', token);
      res.json({success:true, message: "User logged in successfully"});
    
    
    } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };
// Logout

export const userLogout = async(req, res, next) => {
    try {
     res.clearCookie('token');
     res.json({success:true, message: "user logout successfully"});
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };

 
 
 
 
 
 // User profile
 export const userProfile= async(req, res, next) => {
    try {
    const {id} = req.params;
    const useData = await User.findById(id)
     
    res.json({success:true, message: "User data fetched", data: useData });
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };


 // Check user
export const checkUser = async(req, res, next) => {
    try {
    
        const user = req.user;
        if(!user){
            return res.status(400).json({success: true, message:" User not authenticated" });
        }
     res.json({success:true, message: "User data fetched", data: useData });
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };




