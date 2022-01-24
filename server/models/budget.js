const mongoose = require('mongoose')


const BudgetSchema = new mongoose.Schema({
    name:{type:String},
    max:{type:Number}
})