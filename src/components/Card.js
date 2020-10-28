import React from 'react'
import card from '../styles/Card.module.css'
import { getUserName } from '../utils'
import Detail from './Detail'

const Card = (props) => {
    const birthDay = Object.getOwnPropertyNames(props.value)[0]
    const birthDayUserName = getUserName(props.value[birthDay][0].toUserId)
    console.log(props.value[birthDay])

    return (
        <div className={card.cardContainer}>
            <div className={card.rankingTitleContainer}>
                <span className={card.birthDayUserName}>{birthDayUserName}へのプレゼントランキング</span>
                <span className={card.birthDayLabel}>{birthDay}</span>
            </div>
            <div className={card.detailContainer}>
                {props.value[birthDay].map(d => {
                    return <Detail value={d} key={d.InsertUid} />
                })}
            </div>
        </div>
    )
}

export default Card 