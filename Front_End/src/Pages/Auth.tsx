import React from 'react'
import Authorization from '../Components/Authorization';
import Registration from '../Components/Registration';

const Auth: React.FC = () =>  {

  const [form, SetForm] = React.useState<boolean>(true);


  return (
    <div className='form-wraper'>
      <div className="auth">
        {form ? <Authorization/> 
        :
        <Registration/>}
        <p onClick={() => SetForm(!form)}
        >{form ? 'Registration' : 'Login'}</p>
      </div>
    </div>
    
  )
}

export default Auth;
