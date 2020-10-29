import header from '../styles/Header.module.css'
import firebase from '../firebase'
import {useUserStore} from '../store/index'
const Header = (props) => {
    const [user,setUser] = useUserStore()
    const handleClick = () => {
        firebase.auth().signOut()
        .then(() => setUser(null))
    }
    return(
        <div className={header.headerContainer}>
            <div className={header.leftContainer}>
                <div className={header.leftContainer_siteName}>٩(ŏ﹏ŏ｡ )۶</div>
                <div className={header.leftContainer_loginUserName}>こんにちは、としきさん</div>
            </div>
            <div className={header.rightContainer}>
                <div className={header.rightContainer_menuContainer}>
                    <span>プレゼント登録</span>
                </div>
                <a onClick={handleClick} className={header.rightContainer_logout}>
                    ログアウト
                </a>
            </div>
        </div>
    )
}

export default Header