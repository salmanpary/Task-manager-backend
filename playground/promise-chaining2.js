require("../src/db/mongoose.js");
const Task = require("../src/models/task");
// Task.findByIdAndDelete("61f7b0b415c9b17c082dfad1")
//   .then((user) => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log("counting sucess", result, "is completed false");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
const deleteTaskAndCount=async(id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count= await Task.countDocuments({completed:true})
    return count
}
deleteTaskAndCount('61f459d3599cf21764af3438').then((count)=>{console.log(count)}).catch(e=>console.log(e))