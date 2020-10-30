import firebase from '../firebase'
import { getUserData } from '../utils'
const db = firebase.firestore()

export function registUser(data) {
    const user = {
        uid: data.Uid,
        name: data.Name,
        birthday: data.Birthday
    }
    return db.collection('users').doc(user.uid).set(user)
        .then((docRef) => {
            console.log(docRef)
        })
        .catch((err) => {
            console.log(err)
        })
}

export function api_getUserData(uid) {
    return db.collection('users').where('uid', '==', uid).get()
        .then((result) => {
            let userData = []
            result.forEach((d) => {userData.push(d.data())})
            return userData[0]
        })
        .catch((err) => {
            console.log(err)
        })
}