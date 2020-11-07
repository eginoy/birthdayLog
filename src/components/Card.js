import React from 'react'
import card from '../styles/Card.module.css'
import _ from 'lodash'
import BeforeApproval from './BeforeApproval'
import Detail from './Detail'

const Card = (props) => {
    if(!!props.empty) return <BeforeApproval message='登録データが存在しないか、公開されていません'></BeforeApproval>
    const birthday = Object.getOwnPropertyNames(props.value)[0]
    const birthDayUserName = props.value[birthday][0].ToUserName
    props.value[birthday] = _.sortBy(props.value[birthday],p=>{return p.Rank})
    console.log(props.value[birthday])
    

    return (
        <div className={card.cardContainer}>
            <div className={card.rankingTitleContainer}>
                <span className={card.birthDayUserName}>{birthDayUserName}のプレゼントランキング</span>
                <span className={card.birthDayLabel}>{birthday}</span>
            </div>
            <div className={card.detailContainer}>
                {props.value[birthday].map(d => {
                    return <Detail value={d} key={d.Id} isEditable={props.isEditable} />
                })}
            </div>
        </div>
    )
}

export default Card 