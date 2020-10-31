import beforeApproval from '../styles/BeforeApproval.module.css'

const BeforeApproval = (props) => {
    const message = props.message ? props.message : '管理者による認可待機中です'
    return (
        <div className={beforeApproval.dialogContainer}>
            <div className={beforeApproval.messageContainer}>
                <sapn className={beforeApproval.messageLabel}>{message}</sapn>
            </div>
        </div>
    )
}

export default BeforeApproval
