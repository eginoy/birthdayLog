import React from 'react';
import _ from 'lodash';
import Card from './Card';

const ListView = (props) => {
    let mockData = [
        {"toUserId": 1,"BirthDay":"2020/05/27","Name":"僕の心のヤバいやつ１～３巻","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"ヤバいです。","Rate":0,"InsertUid":2,"InsertDate":"2020/5/16"},
        {"toUserId": 1,"BirthDay":"2020/05/27","Name":"ハートそだつよ","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"いらないです。","Rate":0,"InsertUid":3,"InsertDate":"2020/05/16"},
        {"toUserId": 2,"BirthDay":"2020/10/31","Name":"pen","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"ペンですね。","Rate":0,"InsertUid":1,"InsertDate":"2020/10/16"},
        {"toUserId": 2,"BirthDay":"2020/10/31","Name":"ハートそだつよ","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"却下です。","Rate":0,"InsertUid":1,"InsertDate":"2020/10/16"},
        {"toUserId": 3,"BirthDay":"2020/02/09","Name":"ハートそだつよ","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"最高です。","Rate":0,"InsertUid":1,"InsertDate":"2020/01/16"},
        {"toUserId": 3,"BirthDay":"2020/02/09","Name":"ハートそだつよ","URL":"https://example.com/","IsShow":false,"Rank":0,"Comment":"欲しかったものです。","Rate":0,"InsertUid":2,"InsertDate":"2020/01/16"}
    ]

    let groupByBirthDay = data => {
        const birthDays = _.uniq(data.map(d => d.BirthDay));
        let result = birthDays.map(day => {return {[day]:[]}});
        result.forEach(r => {
            data.forEach(d => {
                if(r[d.BirthDay]) r[d.BirthDay].push(d);
            })
        })
        console.log(result);
        return result;
    }
    //データの整形
    let birthDayEvents = groupByBirthDay(mockData);
    //CardコンポーネントにBirthDayごとにグルーピングしてから渡す。
    
    return(
        birthDayEvents.map(e => {
            return <Card value={e} key={e.InsertUid} />
        })
    )
}

export default ListView;