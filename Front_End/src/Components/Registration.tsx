import React from 'react'
import RegPhoto from '../assets/reg-photo.png'
import Camera from '../assets/camera.svg'

const Registration: React.FC = () =>  {
  return (
    <form className='form'>
      <h1>Registration</h1>
      <div className="img-upload">
        <img src={RegPhoto} alt="user" />
        <div className='img-button'>
          <img src={Camera} alt="user" />
        </div>
      </div>
     
      <div className='input-wraper'>
        <label htmlFor="">User name</label>
        <input 
        placeholder='username'
        required
        type="text" />
      </div>
      <div className='input-wraper'>
        <label htmlFor="">Email</label>
        <input 
        placeholder='email@email.com'
        required
        type="email" />
      </div>
      <div className='input-wraper'>
        <label htmlFor="">Password</label>
        <input 
        placeholder='password'
        required
        type="password" />
      </div>
      <button className='form--button'>
        Sign Up
      </button>
    </form>
  )
}

export default Registration;
