import React from 'react'
import {getUserName} from '../utils'
import detail from '../styles/Detail.module.css'

const Detail = (props) => {
    let present = props.value
    return (
        <div className={detail.detailContainer}>
            <div className={detail.rank}>{present.Rank}位</div>
            <div className={detail.contentContainer}>
                <div className={detail.row}>
                    <div className={detail.item}>商品名:{present.Name}</div>
                    <div className={detail.item}>提案者:{present.InsertUserName}</div>
                </div>
                <div className={detail.row}>
                    <div className={detail.item}>評価:{present.Rate}</div>
                </div>
                <div className={detail.row}>
                    <div className={detail.item}>レビュー:{present.Comment}</div>
                </div>
            </div>
        </div>
    )
}

export default Detail