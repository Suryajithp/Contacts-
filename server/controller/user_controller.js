const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports = {

    //// create user

    Signup:async(req,res)=>{
        const {name ,phone, email , password, dob, occupation, company} = req.body;
        console.log("wdhiuwqgdyug");
        const emailExist= await userModel.findOne({email:email})
        const phoneExist= await userModel.findOne({phone:phone})
        if(emailExist || phoneExist){
            res.status(401).json({msg:"exist"})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password,salt)  
        
            const user = new userModel({
                firstname: name,
                email: email,
                phone: phone,
                dob: dob,
                occupation: occupation,
                company: company,
                password: hashedpassword
            })
        
            if (user) {
                user.save()
                res.status(201).json({
                    _id: user.id,
                })
            } else {
                res.status(400)
                throw new Error('Invalid user data')
            }
        }

    

    },

    /// login

    Login:async(req, res) => {
        try {
            console.log(req.body);
            const {email,password} = req.body;
            const userExist = await userModel.findOne({email:email})
            if(userExist && (await bcrypt.compare(password,userExist.password))){
             const id = userExist._id
                if(userExist){
                    const token = jwt.sign({id}, "jwtSecret",{expiresIn:300000})
                    res.status(200).json({msg:"login",token}) 
                }else{
                res.status(401).json({msg:"Your Accont is blocked"})
                }
              
            }else{
                res.status(401).json({msg:"Email or password incorrect"})
            }
        } catch (error) {
            console.log(error);
        }
       
        
    },

    // jwt

    jwt:(req,res)=>{
        res.status(200).json({auth:true})
    }
}