import React, { useState, useEffect } from 'react'
import { Pagination, Spin } from 'antd'

import { getArticles } from '../../services/searchEngine'
import ArticleItem from '../articleItem/articleItem'

import './articleList.scss'

const ArticleList = () => {
  const [page, setPagePagination] = useState(1)
  const [articles, setArticles] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [pagesCount, setPagesCount] = useState(50)
  const setPage = (e) => {
    setPagePagination(e)
    setIsLoaded(false)
    getArticles(e).then((res) => {
      let newArr = res.articles.slice(-5)
      setArticles(newArr)
      setIsLoaded(true)
      setPagesCount(res.articlesCount * 2)
    })
  }
  let id = 100
  const elements = articles.map((el) => {
    id += 1
    return <ArticleItem info={el} key={id} />
  })
  const loadedPage = isLoaded ? (
    <React.Fragment>
      {elements}
      <Pagination defaultCurrent={1} current={page} total={pagesCount} onChange={(e) => setPage(e)} />
    </React.Fragment>
  ) : (
    <Spin className="loader" size="large" />
  )
  useEffect(() => setPage(1), [])
  useEffect(() => {}, [isLoaded])
  return <div className="article-list">{loadedPage}</div>
}

export default ArticleList
