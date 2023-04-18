import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Spin, Button, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getArticle } from '../../services/searchEngine'
import { deleteArticle, likeArticle, dislikeArticle } from '../../services/accountEngine'

import likeNotActive from './like-not-active.svg'
import likeActive from './like-active.svg'
import avatar from './avatar-default.svg'

import './article.scss'

const Article = ({ username }) => {
  const [info, setInfo] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const usernameLogged =
    username || JSON.parse(localStorage.getItem('user'))
      ? username || JSON.parse(localStorage.getItem('user')).username
      : null
  const slug = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length)
  let tagId = 10
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    const formattedDate = format(date, 'MMMM d, yyyy')
    return formattedDate
  }
  useEffect(() => {
    async function getInfo(slug) {
      getArticle(slug).then((res) => {
        setInfo(res.article)
        setFavorite(res.article.favorited)
        setIsLoaded(true)
      })
    }
    getInfo(slug)
  }, [favorite])
  const loadedPage = isLoaded ? (
    <div className="article">
      <div className="article-header">
        <div className="article-info">
          <div className="article-header">
            <h2>{info.title}</h2>
            <img
              src={favorite ? likeActive : likeNotActive}
              className="like"
              onClick={() => {
                if (favorite === false) {
                  likeArticle(slug)
                  setFavorite(true)
                } else {
                  dislikeArticle(slug)
                  setFavorite(false)
                }
              }}
            />
            <div className="article-likes">{info.favoritesCount}</div>
          </div>
          <div className="article-tag-list">
            {info.tagList.map((el) => {
              tagId++
              return (
                <div className="article-tag" key={tagId}>
                  {el}
                </div>
              )
            })}
          </div>
        </div>
        <div className="article-author">
          <div className="article-author-info">
            <div>{info.author.username}</div>
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                lineHeight: '22px',
                letterSpacing: '0px',
                textAlign: 'left',
              }}
            >
              {formatDate(info.createdAt)}
            </div>
          </div>
          <img className="article-author-avatar" src={info.author.image || avatar} />
        </div>
      </div>
      <div className="article-subheader">
        <div className="article-description">{info.description}</div>
        {usernameLogged == info.author.username ? (
          <div className="btns">
            <Popconfirm
              title="Are you sure to delete this article?"
              className="btn-delete"
              cancelText="No"
              okText="Yes"
              onConfirm={() => deleteArticle(slug)}
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              <button className="btn-edit">Edit</button>
            </Link>
          </div>
        ) : null}
      </div>
      <ReactMarkdown className="article-body">{info.body}</ReactMarkdown>
    </div>
  ) : (
    <Spin className="loader" size="large" />
  )
  return <div>{loadedPage}</div>
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  }
}

export default connect(mapStateToProps)(Article)
