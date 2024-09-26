const express = require('express')
const router=express.Router();
const User=require('../models/user')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwtSecret="HarshadI$AGoodB0y"
var fetchuser=require('../middleware/fetchUser')


//Route 1: Create a user using POST "/api/auth/createuser". 
router.post('/createuser', [
    body('email', 'enter a valid name').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 2 }),
    body('password', 'enter a valid password').isLength({ min: 5 }),
], async(req, res)=>{
    let success=false;

    // if there are error return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the user already exists or not 

    try {
        
   
    let user= await User.findOne({email:req.body.email});
    if(user){
     return res.status(400).json({success, error:"Sorry a user with this email already exists"})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt)
    // create a new user 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //   res.json({error:'please enter a uique emailId', message:err.message})})
      const data={
          user:{
              id:user.id
          }
      }
    const authtoken = jwt.sign(data,jwtSecret);

    //   res.json({user})
    success=true;
    res.json({success, authtoken})
    } 
    // catch errors 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 2: Authenticate a user using POST "/api/auth/login". 
router.post('/login', [
    body('email', 'enter a valid name').isEmail(),
    body('password', 'enter a valid name').exists()
], async(req, res)=>{
    // if there are error return bad request and errors 
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const {email, password}=req.body;
try {
    let user= await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"Please try to login with correct login credentials"})
    }
    const passswordcompare= await bcrypt.compare(password, user.password);
    if(!passswordcompare){
        success=false;
        return res.status(400).json( {success, error:"Please try to login with correct login credentials"})

    }
    const  data={
        user:{
            id:user.id
        }
    }
    const authtoken =  jwt.sign(data, jwtSecret);
    success=true;
    res.json({success, authtoken})    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
};
})


//Route 3: get logged in user details using POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async(req, res)=>{
    // if there are error return bad request and errors 
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }; 
    
})
module.exports=router