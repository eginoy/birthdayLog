import firebase from '../firebase'
const db = firebase.firestore().collection('presents')

export function api_registPresent(present){
    return db.add(present)
}
