import { useEffect} from 'react'
import { useUserStore } from '../store/index'
import firebase from '../firebase'
import CustomColorButton from './CustomColorButton'
import login from '../styles/Login.module.css'


const Login = (props) => {
    const [user, setUser] = useUserStore()
    useEffect(() => {
        return firebase.auth().onAuthStateChanged(user => {
            if(!!user)setUser(user.uid)
            console.log(user)
        })
    }, [])
    const handleClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }
    return (
        <div className={login.loginButtonContainer}>
            <CustomColorButton text='Googleアカウントでログイン' onClick={handleClick} size='small' variant='contained' color='primary' />
        </div>
    )
}

export default Login;