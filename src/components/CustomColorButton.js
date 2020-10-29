import {Button,withStyles} from '@material-ui/core'



const CustomColorButton  = (props) => {
    const CustomColorButton = withStyles(() => ({
        root: {
            color: '#fff',
            background: 'hsl(179, 93%, 44%)',
            '&:hover': {
                background: 'hsl(179, 93%, 41%)'
            }
        }
    }))(Button);

    return(
        <CustomColorButton type={props.type} onClick={props.onClick}>{props.text}</CustomColorButton>
    )

}

export default CustomColorButton