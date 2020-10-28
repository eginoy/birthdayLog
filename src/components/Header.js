import header from '../styles/Header.module.css'

const Header = (props) => {
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
                <div className={header.rightContainer_logout}>
                    ログアウト
                </div>
            </div>
        </div>
    )
}

export default Header