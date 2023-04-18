import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createArticle } from '../../services/accountEngine'

import './createArticle.scss'

const CreateArticle = () => {
  const deleteTag = (tag, tagList) => tagList.filter((el) => el !== tag)
  const addTag = (tag, tagList) => {
    if (tag.length > 0) {
      setTags([...tagList, tag])
      setValue('')
    }
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

  const [tags, setTags] = useState([])
  const [value, setValue] = useState('')
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
    createArticle(request)
  }
  let minKey = 10
  const tagList = tags.map((el) => {
    minKey += 1
    return <Tag name={el} key={minKey} />
  })
  return (
    <div className="create-article-container">
      <h2 className="create-article-title">Create new article</h2>
      <form className="create-article-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          {...register('Title', { required: 'The field is required' })}
          type="text"
          id="title"
          placeholder="Title"
          className="create-article-input"
        />
        <div className="error">{errors?.Title && <p>{errors?.Title.message || 'Error'}</p>}</div>

        <label htmlFor="description" className="label">
          Short description
        </label>
        <input
          {...register('Description', { required: 'The field is required' })}
          type="text"
          id="description"
          placeholder="Description"
          className="create-article-input"
        />
        <div className="error">{errors?.Description && <p>{errors?.Description.message || 'Error'}</p>}</div>

        <label htmlFor="text" className="label">
          Text
        </label>
        <textarea
          {...register('Text', { required: 'The field is required' })}
          type="text"
          id="text"
          placeholder="Text"
          className="create-article-input"
          style={{ height: '170px', fontFamily: 'Inter, sans-serif', resize: 'none' }}
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
        <input type="submit" name="submit" value={'Send'} className="create-article-form-submit" />
      </form>
    </div>
  )
}

export default CreateArticle
