import firebase from '../firebase'
const db = firebase.firestore().collection('users')

export function api_registUser(data) {
    const user = {
        Uid: data.Uid,
        Name: data.Name,
        Birthday: data.Birthday
    }
    return db.doc(user.Uid).set(user)
        .then((docRef) => {
            console.log(docRef)
        })
        .catch((err) => {
            console.log(err)
        })
}

export function api_getUserData(uid) {
    return db.where('Uid', '==', uid).get()
        .then((result) => {
            let userData = []
            result.forEach((d) => {userData.push(d.data())})
            return userData[0]
        })
        .catch((err) => {
            console.log(err)
        })
}

export function api_getUserDataMaster(loginUid){
    return db.where('Uid', '!=', loginUid).get()
    .then((result) => {
        let userDataMaster = []
        result.forEach((d) => {userDataMaster.push(d.data())})
        return userDataMaster
    }).catch((err) => {
        console.log(err)
    })
}