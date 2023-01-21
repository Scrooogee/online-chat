import React from 'react'
import logo from '../assets/logo.png'
import headerButton from '../assets/header-button.svg'

const Header: React.FC = () =>  {

    const [online] = React.useState(true)

    return (
        <div className='header'>
            <div className='logo-box'>
                <img  src={logo} alt="logo" />
                <span>Online Chat</span>
            </div>
            <div className="header--dialog-info">
                <p className='header--partner-name'>Caesar Caesar</p> 
                <p className={online ? 'header--online' : 'header--offline'}>{online ? 'online' : 'offline'}</p>
            </div>
            <div className='header--user-info'>
                <img className='more' src={headerButton} alt="more" />
                <img className='user-photo' src="https://picsum.photos/200/300" alt="user" />
            </div>
        </div>
    )
}

export default Header;

