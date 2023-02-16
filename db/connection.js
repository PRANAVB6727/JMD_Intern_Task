const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
// database connection
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("connection successfull");
})
.catch((e)=>{console.log("no connection" +e)});
