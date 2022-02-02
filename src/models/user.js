const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userschema=new mongoose.Schema({
  name: { type: String,required: true,trim: true },
  email: {type:String,
    required:true,
    
    trim:true,
    lowercase:true,
    async validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
     

      

    }

  },
  password:{
    type:String,
    required:true,
    minlength:7,
    trim:true,
    validate(value){
      if(value.toLowerCase().includes('password')){
            throw new Error(
                "Password cannot contain 'password'"
            )
      }


    }

  },
  age: {
    type: Number,
    validate(value){
      if(value<0){
        throw new Error('Age must be a positive number');
      }
    }
  },
  tokens:[
    {
      token:{
        type:String,
        required:true,
      }
    }
  ]
})
userschema.methods.generateAuthToken=async function (){
  const user=this
  const token=jwt.sign({_id:user.id.toString()},'this course')
  user.tokens=user.tokens.concat({token})
  await user.save()
  return token
 
}
userschema.statics.findByCredentials=async(email,password)=>{
  const user=await User.findOne({email:email})
  if(!user){
    throw new Error('unable to login')
  }
  const ismatch=await bcrypt.compare(password,user.password)
  if(!ismatch){
    throw new Error('unable to login')
  }
  return user
}
//hash password before saving
userschema.pre('save',async function(next){
const user=this
console.log('just before saving!')
if(user.isModified('password')){
  user.password=await bcrypt.hash(user.password,8)
}
next()
})
// userschema.index({email: 1}, {unique: true})

const User = mongoose.model("User",userschema);
User.createIndexes()

module.exports=User