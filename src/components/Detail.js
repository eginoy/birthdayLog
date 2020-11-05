import React from 'react'
import {getUserName} from '../utils'
import detail from '../styles/Detail.module.css'
import { Input,InputAdornment, TextField, withStyles } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition'

const Detail = (props) => {
    const { register, handleSubmit, errors, control } = useForm();
    let present = props.value

    const onSubmit = data =>{
        console.log(data)
    }

    if(!!props.isEditable){
        return (
            <div>
                <form className={detail.detailContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={detail.rank}>
                <Input
                        className='row_inputField'
                        endAdornment={<InputAdornment position="end">位</InputAdornment>}
                        type='text'
                        name='Rank'
                        value={present.Rank}
                        inputRef={register()}
                    />                    
                    </div>
                <div className={detail.contentContainer}>
                    <div className={detail.row}>
                        <div className={detail.item}>商品名:{present.Name}</div>
                        <div className={detail.item}>提案者:{present.InsertUserName}</div>
                    </div>
                    <div className={detail.row}>
                        <div className={detail.item}>
                        <Input
                        className='row_inputField'
                        startAdornment={<InputAdornment position="start">評価:</InputAdornment>}
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