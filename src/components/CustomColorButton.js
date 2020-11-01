import {Button,withStyles} from '@material-ui/core'
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';



const CustomColorButton  = (props) => {
    const CustomColorButton = withStyles(() => ({
        root: {
            color: '#fff',
            background: 'hsl(179, 93%, 44%)',
            '&:hover': {
                background: 'hsl(179, 93%, 41%)'
            },
            '&:disabled': {
                    background: 'hsl(179, 93%, 25%)'
            }
        },
    }))(Button);
    const buttonProps = Object.assign({},props)
    delete buttonProps.renderInput
    return(
        <CustomColorButton {...buttonProps}>{buttonProps.text}</CustomColorButton>
    )

}

export default CustomColorButton