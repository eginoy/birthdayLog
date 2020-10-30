import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import errorDialog from '../styles/ErrorDialog.module.css'


const ErrorDialog = (props) => {
    
    const message = props.message ? props.message : '指定されたページは存在しません' 
    return(
        <div className={errorDialog.dialogContainer}>
            <div className={errorDialog.messageContainer}>
                <sapn className={errorDialog.messageLabel}>{message}</sapn>
            </div>
        </div>   
    )
}

export default ErrorDialog