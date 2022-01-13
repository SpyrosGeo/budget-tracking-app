import { Card, ProgressBar} from 'react-bootstrap'
import { currencyFormatter } from '../utils/utils'
export default function BudgetCard({name,amount,max}) {
    const formattedAmount  = currencyFormatter.format(amount);
    const formattedMax = currencyFormatter.format(max)


    const getProgressBarVariant = (amount,max) =>{
        const ratio = amount/max
        if(ratio < .5) return "primary"
        if(ratio < .75) return "warning"
        return "danger"

    }

    return (
        <Card>
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

               </Card.Body> 
        </Card>
    )
}
