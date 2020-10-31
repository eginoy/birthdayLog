import { useState, useEffect } from 'react'
import header from '../styles/Header.module.css'
import firebase from '../firebase'
import { useUserStore } from '../store/index'
import { Link, withRouter } from 'react-router-dom'
import {authUser} from '../utils'

const Header = (props) => {
    const [user, setUser] = useUserStore()
    const [userName, setuserName] = useState('ゲスト');

    const handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                setUser(null)
                props.history.push('/login')
            })
    }
    
    useEffect(() => {
        authUser()
        .then((result) => {
            setUser(result.uid)
            setuserName(user)
        })
        .catch(()=>{
            console.log('login failed')
        })
    },[user])

    return (
        <div className={header.headerContainer}>
            <div className={header.leftContainer}>
                <Link className={header.leftContainer_siteName} to='/'>
                    <div>٩(ŏ﹏ŏ｡ )۶</div>
                </Link>
                <div className={header.leftContainer_loginUserName}>こんにちは、{userName}さん</div>
            </div>
            <div className={header.rightContainer}>
                {!!user &&
                    <div className={header.rightContainer_menuContainer}>
                        <Link to='presentRegist'>
                            <span>プレゼント登録</span>
                        </Link>
                    </div>
                }
                {!!user &&
                    <a onClick={handleClick} className={header.rightContainer_logout}>
                        ログアウト
                </a>
                }
            </div>
        </div>
    )
}

export default withRouter(Header)