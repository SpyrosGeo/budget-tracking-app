const express =require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const app = express()
const expense = require('./models/expense')
const PORT = 3001
const URI = "mongodb+srv://thatguy:aa124888@cluster0.dpgah.mongodb.net/budgetapp?retryWrites=true&w=majority"
app.use(cors())



mongoose.connect(URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

const connection = mongoose.connection;


connection.once("open",()=>{
    console.log("Connected to DB");
})



app.get('/',async(req,res)=>{
    try {
       const reponse = await expense.find() 
       res.json({data:reponse})
    } catch (err) {
        console.log(err);
        
    }
    
})








app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})