import React from 'react'


import Chat from '../Components/Chat';
import Header from '../Components/Header';
import Message from '../Components/Message';


import Camera from '../assets/camera.svg';
import Mic from '../assets/mic.svg';
import SendArrow from '../assets/send.svg'

const Home: React.FC = () =>  {

  const [text, setText] = React.useState('')
  return (
    <div className='home'>
        <Header/>
        <div className="chat">
          <div className="chat--list">
            <div className="chat--list-input">
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.0625 2.125C4.78331 2.125 2.125 4.78331 2.125 8.0625C2.125 11.3417 4.78331 14 8.0625 14C11.3417 14 14 11.3417 14 8.0625C14 4.78331 11.3417 2.125 8.0625 2.125ZM0.875 8.0625C0.875 4.09295 4.09295 0.875 8.0625 0.875C12.032 0.875 15.25 4.09295 15.25 8.0625C15.25 12.032 12.032 15.25 8.0625 15.25C4.09295 15.25 0.875 12.032 0.875 8.0625Z" fill="#8FA0AF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2611 12.2612C12.5051 12.0171 12.9009 12.0171 13.1449 12.2612L16.9418 16.0581C17.1859 16.3022 17.1859 16.6979 16.9418 16.942C16.6977 17.1861 16.302 17.1861 16.0579 16.942L12.2611 13.1451C12.017 12.901 12.017 12.5053 12.2611 12.2612Z" fill="#8FA0AF"/>
              </svg>
              <input
                placeholder='Search'
                type="text" />
            </div>
            <div className="chat--list-wraper">
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>

            </div>
          </div>
          <div className="messages">
            <div className="messages--box">
              <Message className={'message'}/>
              <Message className={'message my'}/>
              <Message className={'message'}/>
              <Message className={'message my'}/>
              <Message className={'message my'}/>
              <Message className={'message my'}/>
              <Message className={'message'}/>
              <Message className={'message my'}/>
              <Message className={'message'}/>
              <Message className={'message'}/>
              <Message className={'message'}/>
              <Message className={'message my'}/>
              
            </div>
            <div className="messages--input-box">
              <div className="messages--input">
                <textarea onChange={e => setText(e.target.value)} placeholder='Message...' name="" id=""></textarea>
                <button type='button'>
                  <img src={Camera} alt="upload" />
                </button>
                {text === '' ? 
                <button type='button'>
                  <img src={Mic} alt="audio" />
                </button>
                :
                <button type='button'>
                  <img src={SendArrow} alt="message" />
                </button>}
                
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home;
