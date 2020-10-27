import React from 'react'

const Card = (props) => {
    const birthDay = Object.getOwnPropertyNames(props.value)[0]
    
    return (
        <div>
            <span>{birthDay}</span>
            <div>
                details
            </div>
        </div>
    )
}

export default Card 