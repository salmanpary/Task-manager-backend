require('../src/db/mongoose.js')
const User=require('../src/models/user')
// User.findByIdAndUpdate('61f50f235821b15d0c9562e5',{age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })
const updateageandcount=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age})
    const count=await User.countDocuments({age})
    return count
}
updateageandcount('61f454ad3a83dd228816c38f',3).then((count)=>{
    console.log(count)
}).catch((e)=>console.log(e))