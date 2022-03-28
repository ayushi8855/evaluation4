const mongoose = require("mongoose")
// const version = require("nodemon/lib/version")
const bcryptjs =require("bcryptjs")
const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save",function(next)
{
    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash
    return next()
})

userSchema.methods.checkPassword = function(password)
{
    return bcryptjs.compareSync(password, this.password)
}

const User = mongoose.model("user",userSchema)

module.exports = User