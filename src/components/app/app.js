import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from '../header'
import ArticleList from '../articleList/articleList'
import Article from '../article'
import SignIn from '../signIn'
import SignUp from '../signUp'
import EditProfile from '../editProfile'
import CreateArticle from '../createArticle'
import EditArticle from '../editArticle'

const App = () => (
  <div className="app">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/" element={<ArticleList />} />
        <Route element={<ArticleList />} />
      </Routes>
    </BrowserRouter>
  </div>
)
export default App
