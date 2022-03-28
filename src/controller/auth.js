
const jwt = require("jsonwebtoken")

const User = require("../model/usermodel")
const generatetoken=(user)=>{
    return jwt.sign({user},"masai")
}
const register= async(req,res)=>{
    try {
   let user = await User.findOne({email:req.body.email}).lean().exec()  
   
   if(user){
       return res.status(201).send({message:"already present"})
   }
   else{
       const token = generatetoken(user)
       user=await User.create({
           firstname:req.body.firstname,
           lastname:req.body.lastname,
          email:req.body.email,
           password:req.body.password,

       })
       return res.status(201).send({user,token})
   }
    } catch (error) {
        return res.status(201).send(error.message)
    }
}


const login= async(req,res)=>{
    try {
   let user = await User.findOne({email:req.body.email})  
   
   if(!user){
       return res.status(201).send({message:"email wrong"})
   }
   const match = user.checkPassword(req.body.password)
   if(!match){
       return res.status(400).send({message:"wrong email or password"})
   }
  
       const token = generatetoken(user)
    
       return res.status(201).send({user,token})
 
    } catch (error) {
        return res.status(201).send(error.message)
    }
}
module.exports={register,login}