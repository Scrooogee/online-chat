import React from 'react'

const Chat: React.FC = () => {
  return (
    <div className='chat--item'>
        <img src="https://picsum.photos/200/300" alt="user" />
        <div>
            <div className="chat--item-info-block">
                <h3>Zack Fox</h3>
                <p>10:49 AM</p>
            </div>
            <p className="chat--item-message-prev">
                Have you ever heard of...
            </p>
        </div>
    </div>
  )
}

export default Chat;
