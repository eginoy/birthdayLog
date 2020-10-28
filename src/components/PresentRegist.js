import presentRegister from '../styles/presentRegister.module.css'
import { withStyles, TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { getUserData } from '../utils'

const PresentRegist = () => {
    const userData = getUserData();
    const { register, handleSubmit, errors, control } = useForm();
    const onSubmit = data => {
        console.log(data)
    }

    const selectItems = (value) => {
        return (
            <MenuItem value={value.Id} key={value.Id}>{value.Name}</MenuItem>
        )
    }

    const CustomColorButton = withStyles(() => ({
        root: {
            color: '#fff',
            background: 'hsl(179, 93%, 44%)',
            '&:hover': {
                background: 'hsl(179, 93%, 41%)'
            }
        }
    }))(Button);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={presentRegister.registerContainer}>
                <div className={presentRegister.title}>プレゼント登録</div>
                <div className={presentRegister.formContainer}>
                    <div className={presentRegister.row}>
                        <InputLabel id='selectNameLabel'>誰へのプレゼント?</InputLabel>
                        <Controller
                            control={control}
                            className='row_inputField'
                            labelId='selectNameLabel'
                            name='toUserId'
                            defaultValue={'1'}
                            ref={register()}
                            as={
                                <Select>
                                    {userData.map(d => {
                                        return selectItems(d)
                                    })}
                                </Select>} />
                    </div>
                    <div className={presentRegister.row}>
                        <TextField
                            label='商品名'
                            fullWidth
                            className='row_inputField'
                            type='text'
                            name='presentName'
                            inputRef={register({ required: true })}
                            error={Boolean(errors.presentName)}
                            helperText={errors.presentName && '商品名は必須入力項目です'}
                        />
                    </div>
                    <div className={presentRegister.row}>
                        <TextField
                            label='参考URL'
                            fullWidth
                            className='row_inputField'
                            type='text'
                            name='presentURL'
                            inputRef={register({ required: true })}
                            error={Boolean(errors.presentURL)}
                            helperText={errors.presentURL && '参考URLは必須入力項目です'}
                        />
                    </div>
                </div>
                <div className={presentRegister.buttonContainer}>
                    <CustomColorButton size='small' type='submit' variant='contained' color='primary'>登録</CustomColorButton>
                </div>
            </div>
        </form>
    )
}

export default PresentRegist