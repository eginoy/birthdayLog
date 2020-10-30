import { useEffect,useState } from 'react'
import { useUserStore } from '../store/index'
import firebase from '../firebase'
import CustomColorButton from './CustomColorButton'
import login from '../styles/Login.module.css'
import { withRouter } from 'react-router-dom'
import {authUser,getbeforeAuthRoutingPath} from '../utils'

const Login = (props) => {
    const self = this;
    const [user, setUser] = useUserStore()
    const [isLoaded, setisLoaded] = useState(false);

    useEffect(() => {
        authUser()
        .then((result)=>{
            setUser(result.uid) 
            getbeforeAuthRoutingPath(result.uid).then((toPath)=>{
                props.history.push(toPath)
            })
        })
        .catch((err)=>{
            console.log(err)
            setisLoaded(true)
        })
    }, [])
    const handleClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }
    return (
        isLoaded &&
        <div className={login.loginButtonContainer}>
            <CustomColorButton text='Googleアカウントでログイン' onClick={handleClick} size='small' variant='contained' color='primary' />
        </div>
        
    )
}

export default withRouter(Login);