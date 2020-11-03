import firebase from '../firebase'
import { dateFormat } from '../utils'
const db = firebase.firestore().collection('presents')

export function api_registPresent(present){
    return db.add(present)
}

export function api_getPresents(){
    return db.get().then(result => {
        let presents = []
        result.forEach(p => {
            presents.push(p.data())
        })
        return presents
    })
}

export async function api_isRegisteredPresent(beforeRegistData){
    const doc = await db
    .where('ToUid','==',beforeRegistData.ToUid)
    .where('Birthday','==',dateFormat(beforeRegistData.Birthday))
    .where('InsertUid','==',beforeRegistData.InsertUid)
    .get()
    return !doc.empty
}