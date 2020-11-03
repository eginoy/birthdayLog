import React from 'react'
import {getUserName} from '../utils'
import detail from '../styles/Detail.module.css'
import { TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

const Detail = (props) => {
    const { register, handleSubmit, errors, control } = useForm();
    let present = props.value

    const onSubmit = data =>{
        console.log(data)
    }

    if(!!props.isEditable){
        return (
            <div className={detail.detailContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className={detail.rank}>
                <TextField
                        fullWidth
                        className='row_inputField'
                        type='text'
                        name='Rank'
                        value={present.Rank}
                        inputRef={register()}
                    />                    
                    位</div>
                <div className={detail.contentContainer}>
                    <div className={detail.row}>
                        <div className={detail.item}>商品名:{present.Name}</div>
                        <div className={detail.item}>提案者:{present.InsertUserName}</div>
                    </div>
                    <div className={detail.row}>
                        <div className={detail.item}>評価:
                        <TextField
                        fullWidth
                        className='row_inputField'
                        type='text'
                        name='Rate'
                        value={present.Rate}
                        inputRef={register()}
                    />                    
                        </div>
                    </div>
                    <div className={detail.row}>
                        <div className={detail.item}>レビュー:
                        <TextField
                        fullWidth
                        className='row_inputField'
                        type='text'
                        name='Comment'
                        value={present.Comment}
                        inputRef={register()}
                    />  
                        </div>
                    </div>
                </div>
                </form>
            </div>
        )
    }else{
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
}

export default Detail