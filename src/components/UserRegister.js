import React,{useState} from 'react'
import userRegister from '../styles/UserRegister.module.css'
import { TextField } from '@material-ui/core'
import {DatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers'
import moment from 'moment'
import 'moment/locale/ja'
import MomentUtils from '@date-io/moment'
import CustomColorButton from './CustomColorButton'
import { useForm} from 'react-hook-form'
import {registUser} from '../api/UserAPI'
import {useUserStore} from '../store/index'

const UserRegister = () => {
    const locale = 'ja'
    const [user] = useUserStore()
    const [birthday, setbirthday] = useState('1997/01/01');
    const { register, handleSubmit, errors} = useForm();
    const onSubmit = data => {
        data.Uid = user
        registUser(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={userRegister.registerContainer}>
                <div className={userRegister.title}>ユーザー情報登録</div>
                <div className={userRegister.formContainer}>
                    <div className={userRegister.row}>
                        <TextField
                            label='ユーザーネーム'
                            fullWidth
                            className='row_inputField'
                            type='text'
                            name='Name'
                            inputRef={register({ required: true })}
                            error={Boolean(errors.Name)}
                            helperText={errors.Name && 'ユーザーネームは必須入力項目です'}
                        />
                    </div>
                    <div className={userRegister.row}>
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
                            <DatePicker
                                label='誕生日'
                                value={birthday}
                                format='YYYY-MM-DD'
                                onChange={(d)=>{setbirthday(d)}}
                                fullWidth
                                className='row_inputField'
                                type='text'
                                name='Birthday'
                                inputRef={register({ required: true })}
                                error={Boolean(errors.Birthday)}
                                helperText={errors.Birthday && '誕生日は必須入力項目です'}
                                renderInput={(props) => <TextField {...props} />}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className={userRegister.buttonContainer}>
                    <CustomColorButton text='登録' size='small' type='submit' variant='contained' color='primary' />
                </div>
            </div>
        </form>
    )
}

export default UserRegister