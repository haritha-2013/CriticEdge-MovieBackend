import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import { generateUserToken } from '../utils/generateToken.js';
import Admin from '../models/adminModel.js';


 export const adminCreate = async(req, res, next) => {
    try {
        console.log('create route hitted'); 

      const {username,email,password,role} = req.body;
      if (!username || !email || !password ) {
return res.status(400).json({ success:false , message: "All fields are required" })
      }
    const adminExist = await Admin.findOne({ email,role });

      if (adminExist) {
        return res.status(404).json({success: false, message: "Admin already exist" });
      }

        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newAdmin = new Admin({username,email,password: hashedPassword,role:"admin" });
        await newAdmin.save();

        // Creating token
      const token = generateUserToken(email, "admin");


      res.cookie('token', token);
      res.json({success:true, message: "Admin created successfully"});
    
    
    } catch (error) {
        res.status(400).json({message:'internalserver'});
 }
 };

 // Admin login
 
 export const adminLogin = async(req, res, next) => {
    try {
      const {email,password} = req.body;
      if ( !email || !password ) {
return res.status(400).json({ success:false , message: "All fields are required" })
      }
      
      // Compare password
      const userExist = await Admin.findOne({ email });

      if (!userExist) {
        return res.status(404).json({success: false, message: "Admin does not exist" });
      }
       
      const passwordMatch = bcrypt.compareSync(password,userExist.password); // true
       
      if(!passwordMatch) {
        return res.status(400).json({success: false, message: "Admin not authenticated" })
      }
       
      
      // Creating token
      const token = generateUserToken(email,"admin");
      res.cookie('token', token);
      res.json({success:true, message: "Admin login successfully"});
    
    
    } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };

 // Admin logout

export const adminLogout = async(req, res, next) => {
    try {
     res.clearCookie('token');
     res.json({success:true, message: "Admin logged out successfully"});
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };


 // Admin profile
 export const adminProfile= async(req, res, next) => {
    try {
    const {id} = req.params;
    const useData = await Admin.findById(id)
     
    res.json({success:true, message: "Admin data fetched", data: useData });
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };


 // Check user

 export const checkAdmin = async(req, res, next) => {
    try {
    
        const admin = req.admin;
        
        if(!admin){
            return res.status(400).json({success: true, message:" Admin not authenticated" });
        }
     res.json({success:true, message: "User data fetched", data: useData });
     } catch (error) {
        res.status(500).json({message:'internal server'});
 }
 };




