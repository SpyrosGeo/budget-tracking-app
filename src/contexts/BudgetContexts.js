import React,{useContext} from 'react'
import {v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'
const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"



//custom hook
export function useBudgets(){
    return   useContext(BudgetContext)
}


export const BudgetsProvider = ({children}) =>{
    const [budgets,setBudgets] = useLocalStorage("budgets",[])
    const [expenses,setExpenses] = useLocalStorage("expenses",[])
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId===budgetId)
    }
    function addExpense({description,amount,budgetId,productLink}){

        setExpenses(prevExpenses=>{
          
            return [...prevExpenses,{id:uuidV4(),description,amount,budgetId,productLink}]
        })
    }
    function addBudget({name,max}){
        setBudgets(prevBudgets=>{
            //check if given name already exists and just returns all the previous Budgets
            if (prevBudgets.find(budget => budget.name===name)){
                return prevBudgets
            }
            return [...prevBudgets,{id:uuidV4(),name,max}]
        })
    }
    function deleteBudget({id}){
        setExpenses(prevExpenses=>{
            return prevExpenses.map(expense=>{
                if(expense.budgetId !== id)return expense
                return {...expense,budgetId:UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget => budget.id !==id)
        })
    }
    function deleteExpense({id}){
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense =>expense.id !==id)
        })
    }



    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
    }}>
        {children}
    </BudgetContext.Provider>
}