import _ from 'lodash'

const userDataMock = [
    {"Id":1,"Uid":"abc","Name":"トシキ","Birthday":"1997/05/27"},
    {"Id":2,"Uid":"def","Name":"しゅうべい","Birthday":"1997/10/31"},
    {"Id":3,"Uid":"ghi","Name":"アル中","Birthday":"1997/02/09"}
]

function getUserName(uid) {
    const userInfo = _.find(userDataMock, u => {return u.Id === uid});
    const userName = userInfo.Name;
    return userName;
}

export {
    getUserName
}