export const getArticles = async (page) => {
  const key = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null
  if (key) {
    const result = await fetch(`https://blog.kata.academy/api/articles?limit=${page * 5}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    const body = await result.json()
    if (!result.ok) alert('Ошибка сервера')
    return body
  } else {
    const result = await fetch(`https://blog.kata.academy/api/articles?limit=${page * 5}`)
    const body = await result.json()
    if (!result.ok) alert('Ошибка сервера')
    return body
  }
}

export const getArticle = async (slug) => {
  const key = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null
  if (key) {
    const result = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    const body = await result.json()
    if (!result.ok) alert('Ошибка сервера')
    return body
  } else {
    const result = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    const body = await result.json()
    if (!result.ok) alert('Ошибка сервера')
    return body
  }
}
