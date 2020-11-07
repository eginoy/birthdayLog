import firebase from '../firebase'
import {dateFormat} from '../utils'
const db_ref = process.env.REACT_APP_DB_REF_USERS
const usersDB = firebase.firestore().collection(db_ref)

export function api_registUser(data) {
    const user = {
        Uid: data.Uid,
        Name: data.Name,
        Birthday: dateFormat(data.Birthday)
    }
    return usersDB.doc(user.Uid).set(user)
        .then((docRef) => {
            console.log(docRef)
        })
        .catch((err) => {
            console.log(err)
        })
}

export function api_getUserName(uid){
    return usersDB.where('Uid','==',uid).get()
    .then((result)=>{
        let userName ="";
        result.forEach(u=>{
            userName = u.data().Name
        })
        return userName
    })
    .catch(()=>{
        return "ユーザーネームの取得に失敗"
    })
}

export function api_getUserData(uid) {
    return usersDB.where('Uid', '==', uid).get()
        .then((result) => {
            let userData = []
            result.forEach((d) => {userData.push(d.data())})
            return userData[0]
        })
        .catch((err) => {
            console.log(err)
        })
}

export function api_getUsersMaster(){
    return usersDB.get()
    .then((result) => {
        let userDataMaster = []
        result.forEach((d) => {
            userDataMaster.push({
                "Name":d.data().Name,
                "Uid":d.data().Uid
            })
        })
        return userDataMaster
    }).catch((err) => {
        console.log(err)
    })
}

export function api_getUserDataMaster(loginUid){
    return usersDB.where('Uid', '!=', loginUid).get()
    .then((result) => {
        let userDataMaster = []
        result.forEach((d) => {userDataMaster.push(d.data())})
        return userDataMaster
    }).catch((err) => {
        console.log(err)
    })
}