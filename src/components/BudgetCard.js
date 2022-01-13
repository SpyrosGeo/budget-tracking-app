import { Card, ProgressBar,Stack,Button} from 'react-bootstrap'
import { currencyFormatter } from '../utils/utils'
export default function BudgetCard({name,amount,max,gray}) {
    const classNames = []
    if(amount > max){
        classNames.push("bg-danger","bg-opacity-10")
    }else if(gray) {
        classNames.push("bg-light")
    }
    const formattedAmount  = currencyFormatter.format(amount);
    const formattedMax = currencyFormatter.format(max)


    const getProgressBarVariant = (amount,max) =>{
        const ratio = amount/max
        if(ratio < .5) return "primary"
        if(ratio < .75) return "warning"
        return "danger"

    }

    return (
        <Card className={classNames.join(" ")}>
           <Card.Body>
               <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                   <div>{name}</div>
                   <div className='d-flex align-items-baseline'>{formattedAmount} <span className='text-muted fs-6 ms-1'>/ {formattedMax}</span></div>
               </Card.Title>
               <ProgressBar 
                    className='rounted-pill' 
                    variant={getProgressBarVariant(amount,max)}
                    min={0}                    
                    max={max}
                    now={amount}
                    />
                <Stack direction="horizontal" gap="2" className="mt-4">
                <Button variant="outline-primary" className="ms-auto">Add Expense</Button>
                <Button variant="outline-secondary" className=''>View Expenses</Button>
                

                </Stack>
               </Card.Body> 
        </Card>
    )
}
