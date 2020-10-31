import { useEffect,useState } from 'react'
import presentRegister from '../styles/PresentRegister.module.css'
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core'
import CustomColorButton from './CustomColorButton'
import { useForm, Controller } from 'react-hook-form'
import { authUser, getUserDataMaster, getbeforeAuthRoutingPath, isAuthedUser } from '../utils'
import { useUserStore } from '../store'
import { withRouter,useLocation } from 'react-router-dom'

const PresentRegister = (props) => {
    const [users, setUsers] = useState([]);
    console.log(users)
    const { register, handleSubmit, errors, control } = useForm();
    const [user, setUser] = useUserStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation()

    useEffect(() => {
        authUser()
            .then((result) => {
                setUser(result.uid)
                getbeforeAuthRoutingPath(result.uid,location.pathname).then((toPath) => {
                    props.history.push(toPath)
                    getUserDataMaster(result.uid).then((userDataMaster) => {setUsers(userDataMaster)})
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
            <MenuItem value={value.Uid} key={value.Uid}>{value.Name}</MenuItem>
        )
    }

    //usersデータの取得処理が終わっていない場合はコンポーネントを返さない
    if(!users[0]) return null

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
                                name='toUid'
                                defaultValue={users[0].Uid}
                                ref={register()}
                                as={
                                    <Select>
                                        {users.map(d => {
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