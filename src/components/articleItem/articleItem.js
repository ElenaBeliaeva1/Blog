import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import avatar from './avatar-default.svg'
import './articleItem.scss'
import likeNotActive from './like-not-active.svg'
import likeActive from './like-active.svg'

const ArticleItem = ({ info }) => {
  let tagId = 10
  const tags = info.tagList.map((el) => {
    tagId++
    return (
      <div className="article-tag" key={tagId}>
        {el}
      </div>
    )
  })

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    const formattedDate = format(date, 'MMMM d, yyyy')
    return formattedDate
  }

  return (
    <Link to={`/articles/${info.slug}`} className="link-article-item">
      <div className="article-item">
        <div className="article-item-info">
          <div className="article-item-header">
            <h2>{info.title}</h2>
            <img src={info.favorited ? likeActive : likeNotActive} className="like" />
            <div className="article-item-likes">{info.favoritesCount}</div>
          </div>
          <div className="article-item-tag-list">{tags}</div>
          <div className="article-item-description">{info.description}</div>
        </div>
        <div className="article-item-author">
          <div className="article-item-author-info">
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
          <img src={info.author.image || avatar} className="article-item-author-avatar" />
        </div>
      </div>
    </Link>
  )
}

export default ArticleItem
