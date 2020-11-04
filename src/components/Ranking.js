import {useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { api_getPresentsForMyself } from '../api/PresentAPI';
import {api_getUsersMaster} from '../api/UserAPI'
import {useUserStore} from '../store/index'
import {setUserName,groupByBirthDay,descSort} from '../utils'

const Ranking = (props) =>{
    const [user,setUser] = useUserStore()
    const [presents, setpresents] = useState([])
    const [usersMaster, setUsersMaster] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if(!user) return props.history.push('/')
        api_getUsersMaster().then(result => {
            setUsersMaster(result)
        })
        api_getPresentsForMyself(user)
        .then((presents)=>{
            setpresents(presents)
            setIsLoaded(true)
        })

    }, [user]);

    if(!isLoaded) return <div>Now Loading...</div>

    console.log(presents)
    console.log(usersMaster)

    setUserName(presents, usersMaster)
    let birthDayEvents = groupByBirthDay(presents)
    let sortedData = descSort(birthDayEvents)

    return(
        <div>Loaded</div>
    )
}

export default withRouter(Ranking)