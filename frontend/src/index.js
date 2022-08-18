import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Post from './Post';
import PostEdit from './PostEdit';
import Create from './Create';
import {  BrowserRouter as Router,Routes, Route, Link  } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/post/:id' element={<Post />}></Route>
          <Route path='/post/edit/:id' element={<PostEdit />}></Route>
          <Route path='/create' element={<Create />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);