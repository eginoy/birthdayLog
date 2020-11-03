import { useUserStore } from '../store/index'
import React, { useEffect, useState } from 'react'
import listView from '../styles/ListView.module.css'
import _ from 'lodash'
import Card from './Card'
import { authUser, getbeforeAuthRoutingPath, descSort,setUserName,groupByBirthDay } from '../utils'
import { api_getUsersMaster } from '../api/UserAPI'
import { api_getPresents } from '../api/PresentAPI'
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
    }, [user])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('presents').onSnapshot(snap=>{
            const data = snap.docs.map(doc => doc.data())
            setPresents(data)
        })
        return () => {unsubscribe()}
    }, []);

    if(!isLoaded){
        return <div>Now Loading</div>
    }

    console.log(usersMaster)
    //データの整形
    setUserName(presents,usersMaster)
    let birthDayEvents = groupByBirthDay(presents)
    let sortedData = descSort(birthDayEvents)
    
    return (
        <div className={listView.cardContainer}>
            {sortedData.map(e => {
                return <Card value={e} key={e.InsertUid} />
            })}
        </div>
    )
}

export default ListView;