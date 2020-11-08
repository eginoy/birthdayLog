import { useUserStore } from '../store/index'
import React, { useEffect, useState } from 'react'
import listView from '../styles/ListView.module.css'
import _ from 'lodash'
import Card from './Card'
import { authUser, getbeforeAuthRoutingPath, descSort,setUserName,groupByBirthDay } from '../utils'
import { api_getUsersMaster } from '../api/UserAPI'
import { api_getPresents,presenstDB } from '../api/PresentAPI'
import firebase from '../firebase'

const ListView = (props) => {
    const [user, setUser] = useUserStore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [presents, setPresents] = useState([]);
    const [usersMaster, setUsersMaster] = useState([]);
    
    useEffect(() => {
        if (!user) props.history.push('/login')
            authUser()
            .then((result) => {
                setUser(result.uid)
                getbeforeAuthRoutingPath(result.uid).then((toPath) => {
                    props.history.push(toPath)
                    api_getUsersMaster().then(result => {
                        setUsersMaster(result)
                    })
                    api_getPresents().then(result => {
                        setPresents(result)
                        setIsLoaded(true)
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
        return ()=>{authUser()}
    }, [user])

    useEffect(() => {
        const unsubscribe = presenstDB.onSnapshot(snap=>{
            let results = []
            snap.docs.forEach(doc => {
                if(doc.data().IsShow) results.push(doc.data())
            })
            setPresents(results)
        })
        return () => {unsubscribe()}
    }, []);

    const Cards = (presentList,usersMaster) => {
        if (presentList.length === 0) return <Card empty={true}></Card>

        //データの整形
        setUserName(presentList, usersMaster)
        let birthDayEvents = groupByBirthDay(presentList)
        let sortedData = descSort(birthDayEvents)

        return sortedData.map(e => {
            return <Card value={e} key={e.InsertUid} />
        })
    }

    if(!isLoaded){
        return <div>Now Loading</div>
    }

    return (
        <div className={listView.cardContainer}>
            {Cards(presents,usersMaster)}
        </div>
    )
}

export default ListView;