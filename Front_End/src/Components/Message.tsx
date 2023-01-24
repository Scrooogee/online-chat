import React from 'react'
import check from '../assets/check.svg'
import doubleCheck from '../assets/double-check.svg'

type MessageProps = {
    className: string
}

const Message: React.FC<MessageProps> = ({className}) => {

    const [checkMessage, setCheckMessage] = React.useState(true)
  return (
    <div className={className}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, rerum.
        <p className='message--time'>
            10:49 AM
            {className.includes('my') && <img src={checkMessage ?doubleCheck : check} alt="" />}
        </p>
    </div>
  )
}

export default Message;