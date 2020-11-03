import React from 'react'
import card from '../styles/Card.module.css'
import { getUserName } from '../utils'
import Detail from './Detail'

const Card = (props) => {
    const birthday = Object.getOwnPropertyNames(props.value)[0]
    const birthDayUserName = props.value[birthday][0].ToUserName
    console.log(props.value[birthday])

    return (
        <div className={card.cardContainer}>
            <div className={card.rankingTitleContainer}>
                <span className={card.birthDayUserName}>{birthDayUserName}のプレゼントランキング</span>
                <span className={card.birthDayLabel}>{birthday}</span>
            </div>
            <div className={card.detailContainer}>
                {props.value[birthday].map(d => {
                    return <Detail value={d} key={d.Id} />
                })}
            </div>
        </div>
    )
}

export default Card 