import React from 'react'

const Authorization: React.FC = () =>  {
  return (
    <form className='form'>
      <h1>Login</h1>
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
        Login
      </button>
    </form>
  )
}

export default Authorization;
