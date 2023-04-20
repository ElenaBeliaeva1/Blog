import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { getArticle } from '../../services/searchEngine'
import { editArticle } from '../../services/accountEngine'

import './editArticle.scss'

const EditArticle = () => {
  const getSlug = (url) => {
    let lastSlashIndex = url.lastIndexOf('/')
    let secondToLastSlashIndex = url.lastIndexOf('/', lastSlashIndex - 1)
    return url.substring(secondToLastSlashIndex + 1, lastSlashIndex)
  }
  const slug = getSlug(window.location.href)
  const deleteTag = (tag, tagList) => tagList.filter((el) => el !== tag)
  const addTag = (tag, tagList) => {
    if (tag.match(/\S+/)) {
      setTags([...tagList, tag])
    }
    setValue('')
  }

  const Tag = ({ name }) => {
    return (
      <div className="tag-container">
        <div className="tag-name">{name}</div>
        <button className="tag-btn" onClick={() => setTags(deleteTag(name, tags))}>
          Delete
        </button>
      </div>
    )
  }

  const [value, setValue] = useState('')
  const [info, setInfo] = useState({})
  const [tags, setTags] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const onSubmit = (e) => {
    const request = {
      article: {
        title: e.Title,
        description: e.Description,
        body: e.Text,
        tagList: tags,
      },
    }
    editArticle(request, slug)
  }
  let minKey = 10
  const tagList = tags.map((el) => {
    minKey += 1
    return <Tag name={el} key={minKey} />
  })
  useEffect(() => {
    async function getInfo(slug) {
      getArticle(slug).then((res) => {
        setInfo(res.article)
        setTags(res.article.tagList)
      })
    }
    getInfo(slug)
  }, [])
  return (
    <div className="edit-article-container">
      <h2 className="edit-article-title">Edit article</h2>
      <form className="edit-article-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          {...register('Title', {
            minLength: 1,
            pattern: {
              value: /\S+/,
              message: 'Title should not consist only of spaces',
            },
          })}
          type="text"
          id="title"
          placeholder="Title"
          className="edit-article-input"
          defaultValue={info.title}
        />
        <div className="error">{errors?.Title && <p>{errors?.Title.message || 'Error'}</p>}</div>

        <label htmlFor="description" className="label">
          Short description
        </label>
        <input
          {...register('Description', { minLength: 1 })}
          type="text"
          id="description"
          placeholder="Description"
          className="edit-article-input"
          defaultValue={info.description}
        />
        <div className="error">{errors?.Description && <p>{errors?.Description.message || 'Error'}</p>}</div>

        <label htmlFor="text" className="label">
          Text
        </label>
        <textarea
          {...register('Text', { minLength: 1 })}
          type="text"
          id="text"
          placeholder="Text"
          className="edit-article-input"
          style={{ height: '170px', fontFamily: 'Inter, sans-serif', resize: 'none' }}
          defaultValue={info.body}
        />
        <div className="error">{errors?.Text && <p>{errors?.Text.message || 'Error'}</p>}</div>

        {tagList}
        <div className="tag-form">
          <input placeholder="Tag" className="tag-input" value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            className="tag-form-delete-btn"
            onClick={(e) => {
              e.preventDefault()
              setValue('')
            }}
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              addTag(value, tags)
            }}
            className="tag-form-submit"
          >
            Add tag
          </button>
        </div>
        <input type="submit" name="submit" value={'Send'} className="edit-article-form-submit" />
      </form>
    </div>
  )
}

export default EditArticle
