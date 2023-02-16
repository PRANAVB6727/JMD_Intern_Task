const mongoose = require('mongoose');
// database connection
mongoose.connect("mongodb+srv://rfqteam:jcPU397fUztigJlR@cluster0.0cbsab8.mongodb.net/rfq2?retryWrites=true&w=majority")
.then(()=>{
    console.log("connection successfull");
})
.catch((e)=>{console.log("no connection" +e)});