import { useEffect} from 'react'
import { useUserStore } from '../store/index'
import firebase from '../firebase'


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
        <div>
            <button onClick={handleClick}>Googleアカウントでログイン</button>
            <span>{user}</span>
        </div>
    )
}

export default Login;