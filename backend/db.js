const mongoose = require('mongoose');


async function connectToMongo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/i-notebook')
 .then(()=>{
 console.log("mongo db is connected ")
 })
}
module.exports = connectToMongo;




