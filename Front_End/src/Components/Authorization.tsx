import React from 'react'
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../redux/store';
import { fetchLogin } from '../redux/Slices/userSlice';
import { Navigate } from 'react-router-dom';


type FormValues = {
  email: string,
  password: string,
}

const Authorization: React.FC = () =>  {

  const dispatch = useAppDispatch()

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Field the email'),
    password: Yup.string().min(5, 'Input correct password').required('Field the password')
  })

  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  const onSubmitLogin = async (values: FormValues) => {
    const data = await dispatch(fetchLogin(values))
    const {_id} = data.payload.userData

    console.log(data)

    if (!data.payload) {
        return alert(`Failed to login`)
    }
    if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
    }
    // return <Navigate to={`/account/${_id}`}/>
  }


  return (
    <Formik 
        className='form'
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmitLogin}
        >

      {({errors, touched}) => (
      <Form>
        <div className='form'>
        <h1>Login</h1>
          <div className='input-wraper'>
            <label htmlFor="">Email</label>
            <Field
            className={errors?.email && touched.email ? 'error' : ''}
            name='email' 
            placeholder='email@email.com'
            required
            type="email" />
            {errors?.email && touched.email && <p className='input--error'>{errors.email}</p>}
          </div>
          <div className='input-wraper'>
            <label htmlFor="">Password</label>
            <Field
            className={errors?.password && touched.password ? 'error' : ''}
            name='password'
            placeholder='password'
            required
            type="password" />
            {errors?.password && touched.password && <p className='input--error'>{errors.password}</p>}
          </div>
          <button disabled={errors.email || errors.password ? true : false} type='submit' className='form--button'>
            Sign Up
          </button>
        </div>
      </Form>)}
    </Formik>
  )
}

export default Authorization;
