import React from 'react'
import './signUp.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { registrationFn } from '../../services/accountEngine'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const onSubmit = (data) => {
    const request = {
      user: {
        username: data.Username,
        email: data['Email address'],
        password: data.Password,
      },
    }
    registrationFn(JSON.stringify(request))
    reset()
  }
  return (
    <div className="sign-up-container">
      <h2 className="sign-up-title">Create new account</h2>
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          {...register('Username', {
            required: 'The field is required',
            minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your username needs to be longer than 20 characters.' },
          })}
          type="text"
          id="username"
          placeholder="Username"
          className="sign-up-form-input"
        />
        <div className="error">{errors?.Username && <p>{errors?.Username.message || 'Error'}</p>}</div>

        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          {...register('Email address', {
            required: 'The field is required',
            pattern: {
              value: /.+@.+\..+/,
              message: 'Incorrect email address',
            },
          })}
          type="email"
          id="email"
          placeholder="Email"
          className="sign-up-form-input"
        />
        <div className="error">
          {errors?.['Email address'] && <p>{errors?.['Email address'].message || 'Error'}</p>}
        </div>

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          {...register('Password', {
            required: 'The field is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your password needs to be longer than 40 characters.' },
          })}
          type="password"
          id="password"
          placeholder="Password"
          className="sign-up-form-input"
        />
        <div className="error">{errors?.Password && <p>{errors?.Password.message || 'Error'}</p>}</div>

        <label htmlFor="password_repeat" className="label">
          Repeat password
        </label>
        <input
          {...register('confirm_password', {
            required: true,
            validate: (val) => watch('Password') === val || 'Your passwords do not match',
          })}
          type="password"
          id="password_repeat"
          placeholder="Password"
          className="sign-up-form-input"
        />
        <div className="error">
          {errors?.['confirm_password'] && <p>{errors?.['confirm_password'].message || 'Error'}</p>}
        </div>
        <div>
          <input type="checkbox" id="agree" name="agree" required />
          <label htmlFor="agree">I agree to the processing of my personal information</label>
        </div>

        <input type="submit" name="submit" value={'Create'} className="sign-up-form-submit" />
      </form>
      <p className="sign-up-link">
        Already have an account?{' '}
        <Link to={'/sign-in'} style={{ textDecoration: 'none', color: '#1890FF' }}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUp
