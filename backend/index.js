const express = require('express');
const notes = require('./routes/notes');
const auths = require('./routes/auth');
const admin = require("./routes/admin");
const cors = require('cors');


var jwt = require('jsonwebtoken');


const connectToMongo = require('./db');
connectToMongo()
  .catch(err => console.log("MongoDB Error:", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req ,res)=>{
    res.send("wlecome to i-notebok");
    console.log("welcome to i notebook");
});

app.use('/api/notes',notes );
app.use('/api/auths',auths);
app.use("/api/admin",admin);




app.listen(8080,()=>{
    console.log("iNotebook backend at http://localhost:8080");
});