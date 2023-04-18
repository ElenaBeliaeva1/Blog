import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { store } from '../..'

const Header = ({ isLogged, username, avatar }) => {
  const logOut = () => store.dispatch({ type: 'LOG_OUT' })
  const header = isLogged ? (
    <React.Fragment>
      <Link to={'/'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
        <h1 className="header-title">Realworld Blog</h1>
      </Link>
      <div className="header-buttons">
        <Link to={'/new-article'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
          <button className="header-button btn-create-article">Create article</button>
        </Link>
        <Link to={'/profile'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
          <div className="user">
            <div className="user-name">{username}</div>
            <img src={avatar} className="user-avatar"></img>
          </div>
        </Link>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
          <button className="header-button btn-log-out" onClick={logOut}>
            Log out
          </button>
        </Link>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to={'/'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
        <h1 className="header-title">Realworld Blog</h1>
      </Link>
      <div className="header-buttons">
        <Link to={'/sign-in'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
          <button className="header-button sign-in">Sign In</button>
        </Link>
        <Link to={'/sign-up'} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }}>
          <button className="header-button sign-up">Sign Up</button>
        </Link>
      </div>
    </React.Fragment>
  )
  return <div className="header">{header}</div>
}

const mapStateToProps = (state) => {
  return {
    isLogged: localStorage.getItem('isLogged') || state.isLogged,
    username: localStorage.getItem('isLogged')
      ? JSON.parse(localStorage.getItem('user')).username
      : state.user.username,
    avatar: localStorage.getItem('isLogged') ? JSON.parse(localStorage.getItem('user')).avatar : state.user.avatar,
  }
}

export default connect(mapStateToProps)(Header)
