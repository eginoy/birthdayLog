import React from 'react'

const UserRegist = (props) => {
   
    return(
        <div>
            <div className='row'>
                <span className='row_label'>ニックネーム:</span>
                <input className='row_inputField' type='text'></input>
            </div>
            <div className='row'>
                <span className='row_label'>誕生日:</span>
                <input className='row_inputField' type='text'></input>
            </div>
        </div>
    )
}

export default UserRegist