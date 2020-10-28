import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core'
import { useForm, Controller} from 'react-hook-form'
import { getUserData } from '../utils'

const PresentRegist = () => {
    const userData = getUserData();
    const { register, handleSubmit, errors, control } = useForm();
    const onSubmit = data => {
        // stateの値をapiへ渡す
        console.log(data)
    }

    const selectItems = (value) => {
        return (
            <MenuItem value={value.Id} key={value.Id}>{value.Name}</MenuItem>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='title'>プレゼント登録</div>
                <div className='row'>
                    <InputLabel id='selectNameLabel'>誰へのプレゼント?</InputLabel>
                    <Controller
                        control ={control}
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
                <div className='row'>
                    <TextField
                        label='商品名'
                        fullWidth
                        margin='normal'
                        className='row_inputField'
                        type='text'
                        name='presentName'
                        inputRef={register({ required: true })}
                        error={Boolean(errors.presentName)}
                        helperText={errors.presentName && '商品名は必須入力項目です'}
                    />
                </div>
                <div className='row'>
                    <TextField
                        label='参考URL'
                        fullWidth
                        margin='normal'
                        className='row_inputField'
                        type='text'
                        name='presentURL'
                        inputRef={register({ required: true })}
                        error={Boolean(errors.presentURL)}
                        helperText={errors.presentURL && '参考URLは必須入力項目です'}
                    />
                </div>
                <input type='submit' value='登録' />
            </div>
        </form>
    )
}

export default PresentRegist