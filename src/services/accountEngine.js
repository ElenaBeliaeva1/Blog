import { store } from '..'

export const registrationFn = async (data) => {
  const result = await fetch('https://blog.kata.academy/api/users', {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!result.ok) {
    alert('Something wrong with your data. Please, change your username or email address')
  } else {
    alert('Account has been created successfully')
    window.location.href = '/sign-in'
  }
}

export const authorizationFn = async (data) => {
  const result = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!result.ok) {
    alert('Something wrong with your data. Please, change your username or email address')
  } else {
    const body = await result.json()
    getAvatar(body.user.username, body.user.email, body.user.token)
  }
}

const getAvatar = async (username, email, token) => {
  const result = await fetch(`https://blog.kata.academy/api/profiles/${username}`)
  if (!result.ok) {
    alert('Something wrong with service')
  } else {
    const body = await result.json()
    const payload = {
      username: body.profile.username,
      email: email,
      avatar: body.profile.image,
      token: token,
    }
    store.dispatch({ type: 'LOG_IN', payload: payload })
    localStorage.setItem('isLogged', 1)
    localStorage.setItem('user', JSON.stringify(payload))
    window.location.href = '/'
  }
}

export const editAccount = async (data) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const obj = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  }
  const response = await fetch('https://blog.kata.academy/api/user', obj)
  if (!response.ok) {
    alert('Something wrong with your data')
  } else {
    store.dispatch({ type: 'EDIT_PROFILE', payload: data })
    alert('Account has been edited successfully')
    store.dispatch({ type: 'LOG_OUT' })
  }
}

export const createArticle = async (data) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const obj = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  }
  const response = await fetch('https://blog.kata.academy/api/articles', obj)
  if (!response.ok) {
    alert('Something wrong with your data')
  } else {
    window.location.href = '/'
    alert('Article has been created successfully')
  }
}

export const deleteArticle = async (slug) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const result = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  if (!result.ok) {
    alert('Something went wrong')
  } else {
    window.location.href = '/'
    alert('This article has been deleted successfully')
  }
}

export const editArticle = async (data, slug) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const obj = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  }
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, obj)
  if (!response.ok) {
    alert('Something wrong with your data')
  } else {
    alert('Article has been edited successfully')
    window.location.href = '/'
  }
}

export const likeArticle = async (slug) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const result = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  if (!result.ok) {
    alert('Something wrong with your like')
  }
}

export const dislikeArticle = async (slug) => {
  const key = JSON.parse(localStorage.getItem('user')).token
  const result = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  if (!result.ok) {
    alert('Something wrong with your dislike')
  }
}
