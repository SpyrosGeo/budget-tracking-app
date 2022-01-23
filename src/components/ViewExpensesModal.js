
import {Modal,Button, Stack} from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets} from '../contexts/BudgetContexts'
import { currencyFormatter } from '../utils/utils'



const ViewExpensesModal = ({handleClose,budgetId}) => {
    const { getBudgetExpenses,budgets,deleteBudget,deleteExpense} = useBudgets()

  const budget = UNCATEGORIZED_BUDGET_ID === budgetId ?{name:'Uncategorized',id:UNCATEGORIZED_BUDGET_ID}
  : budgets.find(b=>b.id===budgetId)

  const expenses = getBudgetExpenses(budgetId)

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
                   <div className='me-auto fs-4'>{expense.description}</div>
                   <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                   <Button onClick={()=>{deleteExpense(expense)}}size="sm" variant='outline-danger'>x</Button>

                 </Stack>
               ))}
                </Stack>
                </Modal.Body>
           
      </Modal>
    )
    }
export default ViewExpensesModal
