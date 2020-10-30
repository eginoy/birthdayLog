import _ from 'lodash'
import firebase from './firebase'
import {api_getUserData} from './api/UserAPI'

const userDataMock = [
    {"Id":1,"Uid":"abc","Name":"トシキ","Birthday":"1997/05/27"},
    {"Id":2,"Uid":"def","Name":"しゅうべい","Birthday":"1997/10/31"},
    {"Id":3,"Uid":"ghi","Name":"アル中","Birthday":"1997/02/09"}
]

export function authUser(){
    return new Promise((resolve,reject) =>{
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            }else{
                reject('login failed')
            }
        })
    })
}

export async function isRegisterdUser(uid){
    let user = await api_getUserData(uid);
    return !!user
}

export async function isAuthedUser(uid){
    let user = await api_getUserData(uid) 
    return !!user && user.isAuthed
}

export function getUserData(){
    return userDataMock.map(u => {
        return {
            'Id': u.Id,
            'Name': u.Name,
            'Birthday': u.Birthday
        }
    })
}

export function getUserName(uid) {
    const userInfo = _.find(userDataMock, u => {return u.Id === uid});
    const userName = userInfo.Name;
    return userName;
}