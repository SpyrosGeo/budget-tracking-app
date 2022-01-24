const mongoose = require('mongoose')


const ExpenseSchema = new mongoose.Schema({
    id:{type:String},
    description:{type:String},
    amount:{type:Number},
    budgetId:{type:String},
    productLink:{type:String}
})


module.exports = mongoose.model("Expense",ExpenseSchema)
