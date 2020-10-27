import React from 'react'
import Detail from './Detail'

const Card = (props) => {
    const birthDay = Object.getOwnPropertyNames(props.value)[0]

    return (
        <div>
            <span>{birthDay}</span>
            {props.value[birthDay].map(d => {
                return <Detail value={d} key={d.InsertUid} />
            })}
        </div>
    )
}

export default Card 