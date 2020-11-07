import { useEffect,useState } from 'react'
import presentRegister from '../styles/PresentRegister.module.css'
import { TextField,Select,  MenuItem, InputLabel } from '@material-ui/core'
import CustomColorButton from './CustomColorButton'
import { useForm, Controller } from 'react-hook-form'
import { authUser, getUserDataMaster, getbeforeAuthRoutingPath, isRegisteredPresent, registPresent } from '../utils'
import { useUserStore } from '../store'
import { withRouter,useLocation } from 'react-router-dom'
import BeforeApproval from './BeforeApproval'

const PresentRegister = (props) => {
    const { register, handleSubmit, errors, control } = useForm();
    const [user, setUser] = useUserStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRegisteredToUser, setIsRegisteredToUser] = useState(false);
    const [users, setUsers] = useState([]);
    const [nowSelecting, setNowSelecting] = useState('');
    const location = useLocation() 

    function checkIsRegisterdToUser(toUid,user){
        isRegisteredPresent(toUid,user).then((isRegistered)=>{
            setIsRegisteredToUser(isRegistered)
        })
    }

    useEffect(() => {
        authUser()
            .then((result) => {
                setUser(result.uid)
                getbeforeAuthRoutingPath(result.uid,location.pathname).then((toPath) => {
                    props.history.push(toPath)
                    getUserDataMaster(result.uid).then((userDataMaster) => {
                        setUsers(userDataMaster)
                        if(userDataMaster.length === 0) return props.history.push('/')
                        checkIsRegisterdToUser(userDataMaster[0].Uid,result.uid)
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            }).finally(()=>{
                setIsLoaded(true)
            })
    }, [])
    
    const handleClick = (value)=>{
        if(value === 0) value = users[0].Uid
        setNowSelecting(value)
        checkIsRegisterdToUser(value,user)
    }

    const onSubmit = data => {
        data.insertUid = user;
        registPresent(data)
        .then(()=>{
            console.log('登録に成功')
            props.history.push('/')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const selectItems = (value) => {
        return (
            <MenuItem onClick={(e)=>{handleClick(e.target.dataset.value)}} value={value.Uid} key={value.Uid}>{value.Name}</MenuItem>
        )
    }

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
                                        <Select id='select'>
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
                        <CustomColorButton text={isRegisteredToUser? '登録済み' : '登録'} disabled={isRegisteredToUser} size='small' type='submit' variant='contained' color='primary' />
                    </div>
                </div>
            </form>
        )                                
    )
}

export default withRouter(PresentRegister)