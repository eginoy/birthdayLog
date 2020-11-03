import _ from 'lodash'
import moment from 'moment'
import firebase from './firebase'
import { api_getUserData, api_getUserDataMaster } from './api/UserAPI'
import { api_registPresent, api_isRegisteredPresent } from './api/PresentAPI'

const userDataMock = [
    { "Id": 1, "Uid": "abc", "Name": "トシキ", "Birthday": "1997/05/27" },
    { "Id": 2, "Uid": "def", "Name": "しゅうべい", "Birthday": "1997/10/31" },
    { "Id": 3, "Uid": "ghi", "Name": "アル中", "Birthday": "1997/02/09" }
]

export function dateFormat(date) {
    let formatDate = moment(date).format('YYYY-MM-DD')
    return formatDate
}

export function authUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            } else {
                reject('login failed')
            }
        })
    })
}

export async function isRegisterdUser(uid) {
    let user = await api_getUserData(uid);
    return !!user
}

export async function isAuthedUser(uid) {
    let user = await api_getUserData(uid)
    return !!user && user.isAuthed
}

export async function getbeforeAuthRoutingPath(uid, currentPath) {
    var registerd = await isRegisterdUser(uid)
    var authed = await isAuthedUser(uid)
    if (!registerd) return '/userRegist'
    if (!authed) return '/beforeApproval'
    return !!currentPath ? currentPath : '/'
}

export async function getUserDataMaster(uid) {
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
    const userInfo = _.find(userDataMock, u => { return u.Id === uid });
    const userName = userInfo.Name;
    return userName;
}

async function getNextBirthDay(uid) {
    let userData = await api_getUserData(uid);
    const userBirthday = new Date(userData.Birthday)
    let nextBirthday = new Date(new Date().getFullYear(), userBirthday.getMonth(), userBirthday.getDate())
    if (nextBirthday < new Date()) {
        const year = nextBirthday.getFullYear() + 1
        nextBirthday = new Date(year, nextBirthday.getMonth(), nextBirthday.getDate())
    }
    return nextBirthday;
}

export async function registPresent(present) {
    let postData = {
        "ToUid": "",
        "Birthday": "",
        "Name": "",
        "URL": "",
        "IsShow": false,
        "Rank": 0,
        "Comment": "",
        "Rate": 0,
        "InsertUid": "",
        "InsertDate": ""
    }

    return getNextBirthDay(present.toUid).then((birthday) => {
        postData.Birthday = dateFormat(birthday)
        postData.ToUid = present.toUid
        postData.Name = present.presentName
        postData.URL = present.presentURL
        postData.InsertUid = present.insertUid
        postData.InsertDate = new Date()

        return api_registPresent(postData)
    })
}

export async function isRegisteredPresent(toUid, uid) {
    var beforeRegisterData = {
        'ToUid': '',
        'Birthday': '',
        'InsertUid': '',
    }
    return getNextBirthDay(toUid).then((birthday) => {
        beforeRegisterData.ToUid = toUid
        beforeRegisterData.Birthday = birthday
        beforeRegisterData.InsertUid = uid
        return api_isRegisteredPresent(beforeRegisterData)
    })
}

export function setUserName(data, usersMaster) {
    data.forEach(d => {
        usersMaster.forEach(u => {
            if (d.ToUid === u.Uid) d.ToUserName = u.Name
            if (d.InsertUid === u.Uid) d.InsertUserName = u.Name
        })
    })
}

export function groupByBirthDay(data) {
    const birthdays = _.uniq(data.map(d => d.Birthday));
    let result = birthdays.map(day => { return { [day]: [] } });
    result.forEach(r => {
        data.forEach(d => {
            if (r[d.Birthday]) r[d.Birthday].push(d);
        })
    })
    console.log(result);
    return result;
}

export function descSort(data) {
    return data.sort((a, b) => {
        var tmpA, tmpB
        tmpA = new Date(Object.getOwnPropertyNames(a)[0])
        tmpB = new Date(Object.getOwnPropertyNames(b)[0])

        if (tmpA > tmpB) return -1;
        if (tmpA < tmpB) return 1;
        return 0;
    })
}