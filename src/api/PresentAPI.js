import firebase from '../firebase'
import { dateFormat } from '../utils'
const db_ref = process.env.REACT_APP_DB_REF_PRESENTS
export const presenstDB = firebase.firestore().collection(db_ref)

export function api_registPresent(present){
    return presenstDB.add(present)
    .then((doc)=>{
        presenstDB.doc(doc.id).update({
            Id:doc.id
        })
    })
}

export function api_updatePresent(present){
    return presenstDB.doc(present.Id).update({
        Rank:present.Rank,
        Rate:present.Rate,
        Comment:present.Comment
    })
}

export function api_releasePresent(id){
    return presenstDB.doc(id).update({
        IsShow:true
    })
}

export function api_getPresents(){
    return presenstDB.where('IsShow','==',true).get().then(result => {
        let presents = []
        result.forEach(p => {
            presents.push(p.data())
        })
        return presents
    })
}

export function api_getPresentsForMyself(uid){
    return presenstDB.where("ToUid","==",uid).get().then((result)=>{
        let presents = []
        result.forEach(p =>{presents.push(p.data())})
        presents.forEach(p => {p.isEditable = true})
        return presents
    })
}

export async function api_isRegisteredPresent(beforeRegistData){
    const doc = await presenstDB
    .where('ToUid','==',beforeRegistData.ToUid)
    .where('Birthday','==',dateFormat(beforeRegistData.Birthday))
    .where('InsertUid','==',beforeRegistData.InsertUid)
    .get()
    return !doc.empty
}