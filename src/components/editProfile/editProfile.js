import React from 'react'
import './editProfile.scss'
import { useForm } from 'react-hook-form'

import { editAccount } from '../../services/accountEngine'

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
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
        image: data.Avatar,
      },
    }
    reset()
    editAccount(request)
  }

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit(onSubmit)}>
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
          className="edit-profile-form-input"
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
          className="edit-profile-form-input"
        />

        <div className="error">
          {errors?.['Email address'] && <p>{errors?.['Email address'].message || 'Error'}</p>}
        </div>

        <label htmlFor="password" className="label">
          New password
        </label>
        <input
          {...register('Password', {
            required: 'The field is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your password needs to be longer than 40 characters.' },
          })}
          type="new_password"
          id="new_password"
          placeholder="New password"
          className="edit-profile-form-input"
        />
        <div className="error">{errors?.Password && <p>{errors?.Password.message || 'Error'}</p>}</div>

        <label htmlFor="avatar" className="label">
          Avatar image (url)
        </label>
        <input
          {...register('Avatar', { required: 'The field is required' })}
          type="avatar"
          id="avatar"
          placeholder="Avatar image"
          className="edit-profile-form-input"
        />
        <div className="error">{errors?.Avatar && <p>{errors?.Password.message || 'Error'}</p>}</div>

        <button type="submit" name="submit" className="edit-profile-form-submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
