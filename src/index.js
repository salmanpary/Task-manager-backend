const express = require("express");
require("./db/mongoose");
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')


const app = express();
const port = process.env.PORT || 3000;
// app.use((req,res,next)=>{
//   if(req.method==='GET'){
//     res.send('get requests are disabled')

//   }else{
//     next()
//   }
//   console.log(req.method,req.path)
//   next()
// app.use((req,res,next)=>{
//   res.status(503).send('site is currently down check back soon')
// })
// })
app.use(express.json());
app.use(userrouter)
app.use(taskrouter)




app.listen(port, () => {
  console.log("server is up on port" + port);
})
const jwt=require('jsonwebtoken')
const myfunctin=async()=>{
 const token= jwt.sign({_id:'abc123'},'this course',{expiresIn:'7 days'})
 console.log(token)
 const data=jwt.verify(token,'this course')
console.log(data)


}
myfunctin()