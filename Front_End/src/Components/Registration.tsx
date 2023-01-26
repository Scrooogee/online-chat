import React from 'react'
import RegPhoto from '../assets/reg-photo.png'
import Camera from '../assets/camera.svg'
import { useAppDispatch } from '../redux/store'
import { fetchRegister, SelectAuth } from '../redux/Slices/userSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

type FormValues = {
    email: string,
    password: string,
    fullname: string,
    avatar: string,
}


declare module 'react' {
  interface HTMLAttributes<T> {
    children?: ReactNode | ReactNode[];
  }
}

const Registration: React.FC<{}> = () =>  {

  const {data, status} = useSelector(SelectAuth)

  const inputFileRef = React.useRef<any>()
  
  const dispatch = useAppDispatch()

  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().min(3, 'Min length 3 symbols').required('Field your name'),
    email: Yup.string().email('Invalid email').required('Field the email'),
    password: Yup.string().min(5, 'Min length 5 symbols').required('Create the password'), 
    avatar: Yup.string()
  })

  const initialValues: FormValues = {
    fullname: '',
    email: '',
    password: '',
    avatar: ''
  }


  const uploadFile = () =>{
    if(inputFileRef.current) {
        inputFileRef.current.click()
    }
}
  

 

  const onSubmitReg = async (values: FormValues) => {
    const data: any = await dispatch(fetchRegister(values))
    const {_id} = data.payload.userData

    if (!data.payload) {
        return alert(`Failed to reg`)
    }
    if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
    }
    // return <Navigate to={`/account/${_id}`}/>
  }


  // if(data && window.localStorage.getItem('token')) {
  //     return <Navigate to={`/account/${data.userData?._id}`}/>
  // }

  return (
    <Formik 
        className='form'
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmitReg}>
      {(props: FormikProps<FormValues>) => {
        
        const {errors, touched} = props;

        console.log(props)
        return (
      <Form>
        <div className='form'>
        <h1>Registration</h1>
        <div onClick={uploadFile} className="img-upload">
          <img src={RegPhoto} alt="user" />
          <div className='img-button'>
            <img src={Camera} alt="user" />
          </div>
        </div>
        <Field
          // onChange={handleChangeFile}
          ref={inputFileRef}
          className='file'
          name='image' 
          type="file" 
          hidden/>
        <div className='input-wraper'>
          <label htmlFor="">Name</label>
          <Field 
          className={errors?.fullname && touched.fullname ? 'error' : ''}
          name='fullname' 
          placeholder='John Smith'
          required
          type="text" />
          {errors?.fullname && touched.fullname && <p className='input--error'>{errors.fullname}</p>}
        </div>
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
        <button disabled={errors.fullname || errors.email || errors.password ? true : false} type='submit' className='form--button'>
          Sign Up
        </button>
        </div>
      </Form>)}}
    </Formik>
  )
}

export default Registration;
