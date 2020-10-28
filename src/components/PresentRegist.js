import {useForm} from 'react-hook-form'
import { getUserData } from '../utils'

const PresentRegist = () => {
    const userData = getUserData();
    let nowSelectingUid = {};
    const {register,handleSubmit,errors,required} = useForm();
    const onSubmit = data => {
        // stateの値をapiへ渡す
        console.log(data)
    }

    const selectItems = (value) => {
        return (
            <option value={value.Id} key={value.Id}>{value.Name}</option>
        )
    }

    function onChange(e) {
        nowSelectingUid = e.target.value;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='title'>プレゼント登録</div>
                <div className='row'>
                    <span>{errors.toUserId && '宛先は必須選択項目です'}</span>
                    <span className='row_label'>誰へのプレゼント?:</span>
                    <select
                    className='row_inputField'
                    onChange={onChange}
                    name='toUserId'
                    ref={register({required:true})}
                    >
                        <option value={''}>選択してください</option>
                        {userData.map(d => {
                            return selectItems(d)
                        })}
                    </select>
                </div>
                <div className='row'>
                    <span className='error'>{errors.presentName && '商品名は必須入力項目です'}</span>
                    <span className='row_label'>商品名:</span>
                    <input
                     className='row_inputField'
                     type='text' 
                     name='presentName'
                     ref={register({required:true})} 
                     />
                </div>
                <div className='row'>
                    <span className='error'>{errors.presentURL && '参考URLは必須入力項目です'}</span>
                    <span className='row_label'>参考URL:</span>
                    <input
                     className='row_inputField'
                     type='text' 
                     name='presentURL'
                     ref={register({required:true})} 
                     />
                </div>
                <input type='submit' value='登録' />
            </div>
        </form>
    )
}

export default PresentRegist