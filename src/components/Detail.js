import React from 'react'
import {getUserName} from '../utils'

const Detail = (props) => {
    let present = props.value
    return (
        <div>
            <div>順位:{present.Rank}</div>
            <div>
                <div className='row'>
                    <div className='item'>商品名:{present.Name}</div>
                    <div className='item'>提案者:{getUserName(present.InsertUid)}</div>
                </div>
                <div className='row'>
                    <div className='item'>評価:{present.Rate}</div>
                </div>
                <div className='row'>
                    <div className='item'>レビュー:{present.Comment}</div>
                </div>
            </div>
        </div>
    )
}

export default Detail