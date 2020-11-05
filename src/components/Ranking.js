import Card  from './Card';
import {useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { api_getPresentsForMyself } from '../api/PresentAPI';
import {api_getUsersMaster} from '../api/UserAPI'
import {useUserStore} from '../store/index'
import {setUserName,groupByBirthDay,descSort} from '../utils'
import BeforeApproval from './BeforeApproval'

const Ranking = (props) =>{
    const [user,setUser] = useUserStore()
    const [presents, setpresents] = useState([])
    const [usersMaster, setUsersMaster] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    const Cards = () => {
        if(presents.length < 0) return <BeforeApproval message='自身宛てのプレゼントが未登録です'></BeforeApproval>
                
        setUserName(presents, usersMaster)
        let birthDayEvents = groupByBirthDay(presents)
        let sortedData = descSort(birthDayEvents)
        return(
            sortedData.map(d =>{
                return <Card value={d} key={d.InsertUid}></Card>

            })
        )

    }

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

    return(
        Cards()
    )
}

export default withRouter(Ranking)