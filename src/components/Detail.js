import React,{useState} from 'react'
import _ from 'lodash'
import detail from '../styles/Detail.module.css'
import { Input,InputAdornment, TextField, withStyles } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import ClassNames from 'classnames'
import CustomColorButton from './CustomColorButton'
import { api_releasePresent, api_updatePresent } from '../api/PresentAPI'

const Detail = (props) => {
    const { register, handleSubmit, errors, control } = useForm();
    // const [present, setPresent] = useState(props.value);
    let present = props.value
    
    const onSubmit = data =>{
        console.log(data)
        // memo:onsubmit後に入力前の値が入るので書き換えてる
        present.Rank = data.Rank;
        present.Rate = data.Rate;
        present.Comment = data.Comment;

        api_updatePresent(data)
    }

    const handleClick = () => {
        present.IsShow = true
        api_releasePresent(present.Id)
    }
    
    const detailContainer = ClassNames(detail.detailContainer,{
        [detail.detailContainer_editable]:props.isEditable
    })
    
    const contentContainer = ClassNames(detail.contentContainer,{
        [detail.contentContainer_editable]:props.isEditable
    })
    
    const commentContainer = ClassNames(detail.commentContainer,{
        [detail.commentContainer_editable]:props.isEditable
    })
    
    const item = ClassNames(detail.item,{
        [detail.view]: !props.isEditable
    })

    const commentLabel = ClassNames(detail.commentLabel,{
        [detail.view]: !props.isEditable
    })

    const RankInput = withStyles(()=>({
        root:{
            width:'2.2em'
        },
        input:{
            textAlign:'end'
        }
    }))(Input)
    
    const ReviewInput = withStyles(()=>({
        root:{
            width:'4em'
        }
    }))(Input)
    
    if(!!props.isEditable){
        return (
            <div>
                <form className={detailContainer} onSubmit={handleSubmit(onSubmit)}>
                <div className={detail.rank}>
                <RankInput
                        className='row_inputField'
                        endAdornment={<InputAdornment position="end">位</InputAdornment>}
                        type='text'
                        name='Rank'
                        defaultValue={present.Rank}
                        inputRef={register()}
                    />                    
                    </div>
                <div className={contentContainer}>
                    <div className={detail.row}>
                        <div className={detail.item}>商品名: <a className={detail.itemName} href={present.URL} target="_blank">{present.Name}</a></div>
                        <div className={detail.item}>提案者: {present.InsertUserName}</div>
                    </div>
                    <div className={detail.row}>
                        <div className={detail.item}>
                        <ReviewInput
                        className='row_inputField'
                        startAdornment={<InputAdornment position="start">評価:</InputAdornment>}
                        type='text'
                        name='Rate'
                        defaultValue={present.Rate}
                        inputRef={register()}
                    />                    
                        </div>
                    </div>
                </div>
                <div className={commentContainer}>
                        <TextField
                            className='row_inputField'
                            type='text'
                            multiline
                            label="レビュー:"
                            variant="outlined"
                            rowsMax={3}
                            defaultValue={present.Comment}
                            name='Comment'
                            inputRef={register()}
                        /> 
                </div>
                <div className={detail.buttonContainer}>
                    <CustomColorButton text="登録" type="submit" size='small' variant='contained' color='primary'></CustomColorButton>
                    <CustomColorButton text={present.IsShow ? "公開済み" : "公開する"} disabled={present.IsShow} onClick={handleClick} size='small' variant='contained' color='primary'></CustomColorButton>
                </div>
                <input ref={register()} name="Id" defaultValue={present.Id} hidden={true}/>
                </form>
            </div>
        )
    }else{
        return (
            <div className={detail.detailContainer}>
                <div className={detail.rank}>{present.Rank}位</div>
                <div className={detail.contentContainer}>
                    <div className={detail.row}>
                        <div className={item}>商品名:  <a href={present.URL} target="_blank">{present.Name}</a></div>
                        <div className={item}>提案者: {present.InsertUserName}</div>
                    </div>
                    <div className={detail.row}>
                        <div className={item}>評価: {present.Rate}</div>
                    </div>
                </div>
                <div className={detail.commentContainer}>
                <div className={detail.row}>
                        <div className={commentLabel}>レビュー:</div>
                        <div className={item}><span className={detail.comment}>{present.Comment}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail