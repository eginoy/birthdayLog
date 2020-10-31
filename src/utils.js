import _ from 'lodash'
import firebase from './firebase'
import {api_getUserData,api_getUserDataMaster} from './api/UserAPI'
import {api_registPresent} from './api/PresentAPI'

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

export async function getbeforeAuthRoutingPath(uid,currentPath){
    var registerd = await isRegisterdUser(uid)
    var authed = await isAuthedUser(uid)
    if(!registerd) return '/userRegist'
    if(!authed) return '/beforeApproval'
    return !!currentPath ? currentPath :  '/'
}

export async function getUserDataMaster(uid){
    const userDataMaster = await api_getUserDataMaster(uid)
    return userDataMaster.map(u => {
        return {
            'Uid': u.Uid,
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

async function getBirthDay(uid){
    let userData = await api_getUserData(uid);
    return userData.BirthDay;
}

export async function registPresent(present){
    let postData = { 
            "toUid": "",
            "BirthDay": "",
            "Name": "",
            "URL": "",
            "IsShow": false,
            "Rank": 0,
            "Comment": "",
            "Rate": 0,
            "InsertUid": "",
            "InsertDate": ""
        }
    postData.toUid = present.toUid
    getBirthDay(postData.toUid).then((birthday) => postData.BirthDay = birthday)
    postData.Name = present.presentName 
    postData.URL = present.presentURL
    postData.InsertUid = present.insertUid  
    postData.InsertDate = new Date()

    api_registPresent(postData)
}