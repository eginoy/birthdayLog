import Card  from './Card';
import {useEffect,useState} from 'react'
import { withRouter,useLocation } from 'react-router-dom';
import { api_getPresentsForMyself } from '../api/PresentAPI';
import {api_getUsersMaster} from '../api/UserAPI'
import {useUserStore} from '../store/index'
import {setUserName,groupByBirthDay,descSort,authUser,getbeforeAuthRoutingPath} from '../utils'
import BeforeApproval from './BeforeApproval'

const Ranking = (props) =>{
    const location = useLocation()
    const [user,setUser] = useUserStore()
    const [presents, setpresents] = useState([])
    const [usersMaster, setUsersMaster] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        authUser()
            .then((result) => {
                setUser(result.uid)
                getbeforeAuthRoutingPath(result.uid,location.pathname).then((toPath) => {
                    props.history.push(toPath)
                    api_getUsersMaster().then(result => {
                        setUsersMaster(result)
                    })
                    api_getPresentsForMyself(user)
                    .then((presents)=>{
                        if(presents.length === 0)props.history.push('/')
                        setpresents(presents)
                        setIsLoaded(true)
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            }).finally(()=>{
                setIsLoaded(true)
            })
    }, [user]);

    const Cards = () => {
        if(presents.length < 0) return <BeforeApproval message='自身宛てのプレゼントが未登録です'></BeforeApproval>
                
        setUserName(presents, usersMaster)
        let birthDayEvents = groupByBirthDay(presents)
        let sortedData = descSort(birthDayEvents)
        return(
            sortedData.map(d =>{
                return <Card value={d} key={d.InsertUid} isEditable={true}></Card>
            })
        )
    }

    if(!isLoaded) return <div>Now Loading...</div>

    return(
        Cards()
    )
}

export default withRouter(Ranking)