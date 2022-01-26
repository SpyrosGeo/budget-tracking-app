
import {Modal,Button, Stack} from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets} from '../contexts/BudgetContexts'
import { currencyFormatter } from '../utils/utils'



const ViewExpensesModal = ({handleClose,budgetId}) => {
    const { getBudgetExpenses,budgets,deleteBudget,deleteExpense} = useBudgets()

  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ?{name:'Uncategorized',id:UNCATEGORIZED_BUDGET_ID}
  : budgets.find(b=>b.id===budgetId)

  const expenses = getBudgetExpenses(budgetId)

  const inactiveLink = {
    color:"black",
    textDecoration:"none",
    pointerEvents:'none',
    cursor:'default'
  }
    
    return (
        <Modal show={budgetId !=null} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            <Stack direction='horizontal' gap='2'>
              <div>Expenses - {budget?.name}</div>
              {budgetId !== UNCATEGORIZED_BUDGET_ID&&(
                <Button variant="outline-danger" onClick={()=>{
                  deleteBudget(budget)
                  handleClose()
                }}>Delete</Button>
              )}

            </Stack>
            </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <Stack gap="3" direction="vertical">
               {expenses.map(expense=>(
                 <Stack direction='horizontal' gap="2" key={expense.id}>
                   <div className='me-auto fs-4'><a style={expense.productLink===""?inactiveLink:null} rel='noreferrer' target="_blank" href={expense.productLink?expense.productLink:"#"}>{expense.description}</a></div>
                   <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                   {/* {expense.productLink&&<Button size="sm" variant='outline-primary'><a rel="noreferrer"target="_blank" href={expense.productLink}>Link</a></Button>} */}
                   <Button onClick={()=>{deleteExpense(expense)}}size="sm" variant='outline-danger'>x</Button>

                 </Stack>
               ))}
                </Stack>
                </Modal.Body>
           
      </Modal>
    )
    }
export default ViewExpensesModal
