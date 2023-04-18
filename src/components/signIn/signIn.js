import React from 'react'
import './signIn.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { authorizationFn } from '../../services/accountEngine'

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    const request = {
      user: {
        email: data.email,
        password: data.password,
      },
    }
    authorizationFn(request)
    reset()
    if (localStorage.getItem('isLogged')) window.location.href = '/'
  }

  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">Sign In</h2>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          {...register('email', { required: 'The field is required' })}
          type="email"
          id="email"
          className="sign-in-form-input"
        />
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          {...register('password', { required: 'The field is required' })}
          type="password"
          id="password"
          className="sign-in-form-input"
        />
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      <p className="sign-in-link">
        Don’t have an account?{' '}
        <Link to={'/sign-up'} style={{ textDecoration: 'none', color: '#1890FF' }}>
          Sign Up
        </Link>
        .
      </p>
    </div>
  )
}

export default SignIn
