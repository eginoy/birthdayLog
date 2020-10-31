import { useEffect,useState } from 'react'
import presentRegister from '../styles/PresentRegister.module.css'
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core'
import CustomColorButton from './CustomColorButton'
import { useForm, Controller } from 'react-hook-form'
import { authUser, getUserData, getbeforeAuthRoutingPath, isAuthedUser } from '../utils'
import { useUserStore } from '../store'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'


const PresentRegister = (props) => {
    const userData = getUserData();
    console.log(userData)
    const { register, handleSubmit, errors, control } = useForm();
    const [user, setUser] = useUserStore();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!user) props.history.push('/login')
        authUser()
            .then((result) => {
                setUser(result.uid)
                isAuthedUser(result.uid).then((isAuthed) => {
                    if (!isAuthed) props.history.push('/beforeApproval')
                    setIsLoaded(true)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onSubmit = data => {
        console.log(data)
    }

    const selectItems = (value) => {
        return (
            <MenuItem value={value.Id} key={value.Id}>{value.Name}</MenuItem>
        )
    }

    return (
        isLoaded && (
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
                        <CustomColorButton text='登録' size='small' type='submit' variant='contained' color='primary' />
                    </div>
                </div>
            </form>
            
        )                                
    )
}

export default withRouter(PresentRegister)