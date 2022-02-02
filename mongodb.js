// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID=mongodb.ObjectID
const {MongoClient,ObjectId}=require('mongodb')
const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const id=new ObjectId()
console.log(id.id.length)
console.log(id.toHexString().length)




MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to db");
    }
    const db = client.db(databaseName);
  //  db.collection('users').updateOne({
  //    _id:new ObjectId("61f1a4d5145cd32704a2ea6c")
  //  },
  //  {
  //    $inc:{
  //      age:1}
  //  } ).then((result)=>{
  //    console.log(result)
  //  }).catch(()=>{
  //    console.log(error)
  //  })
// db.collection('tasks').updateMany({
//   completed:false
// },{
//   $set:{
//     completed:true
//   }
// }).then((result)=>console.log(result.modifiedCount)).catch((error)=>console.log(error))
    

    })
    

  
//  db.collection('users').find({age:27}).toArray((error,users)=>{
//    console.log(users)
//  })
//  db.collection('users').find({age:27}).count((error,count)=>{console.log(count)})
// })
