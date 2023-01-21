import React from 'react'

const Registration: React.FC = () =>  {
  return (
    <form className='form'>
      <h1>Registration</h1>
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
