import React from 'react'
import { getUserData } from '../utils'

const PresentRegist = () => {
    const userData = getUserData();
    let nowSelectingUid = {};
    
    const selectItems = (value) => {
        return (
            <option value={value.Id} key={value.Id}>{value.Name}</option>
        )
    }

    function onChange(e) {
        nowSelectingUid = e.target.value;
    }

    return (
        <div>
            <div className='title'>プレゼント登録</div>
            <div className='row'>
                <span className='row_label'>誰へのプレゼント?:</span>
                <select className='row_inputField' onChange={onChange}>
                    <option>選択してください</option>
                    {userData.map(d => {
                        return selectItems(d)
                    })}
                </select>
            </div>
            <div className='row'>
                <span className='row_label'>商品名:</span>
                <input className='row_inputField' type='text'></input>
            </div>
            <div className='row'>
                <span className='row_label'>参考URL:</span>
                <input className='row_inputField' type='text'></input>
            </div>
        </div>
    )
}

export default PresentRegist