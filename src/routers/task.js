const express=require('express')
const Task=require('../models/task')
const router=new express.Router()
router.post("/tasks", async(req, res) => {
  const task = new Task(req.body);
  try{
    await task.save()
    res.status(201).send(task)
  }
  catch(e){
    res.status(400).send(e)

  }
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});
router.get('/tasks',async(req,res)=>{

    try{const tasks=await Task.find({})
    res.send(tasks)
  
    }catch(e){
      res.status(500).send(e)
    }
     
      // Task.find({}).then((users)=>{res.status(501).send(users)}).catch((e)=>{res.status(500).send(e)})
  })
  router.get('/tasks/:id',async(req,res)=>{
      const _id=req.params.id
      try{
        const task=await Task.findById(_id)
        if(!task){
          return res.status(404).send()
        }
        res.send(task)
  
      }
      catch(e){
        res.status(500).send(e)
      }
      // Task.findById(_id).then((task)=>{
      //     if(!task){
      //         return res.status(404).send()
      //     }
      //     res.send(task)
      // }).catch((e)=>{res.status(500).send(e)})
  })
  router.patch('/tasks/:id',async(req,res)=>{
    const required=Object.keys(req.body)
    const included=['description','completed']
    const isvalid=required.every((item)=>{
      return included.includes(item)
    })
    if(!isvalid){
  return res.status(400).send({error:'invalid task updates'})
    }
    try{
      const task=await Task.findById(req.params.id)
      required.forEach((update)=>task[update]=req.body[update])
      await task.save()
    //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!task){
      return res.status(400).send()
    }
    res.send(task)}
    catch(e){
      res.status(500).send(e)
    }
    
  })
  router.delete('/tasks/:id',async(req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id)
    try{
    if(!task){
      return res.status(404).send()
    }
    res.send(task)}
    catch(e){
      res.status(500).send(e)
    }
  })


module.exports=router