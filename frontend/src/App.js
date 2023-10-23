import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from './components/Comments/Comments';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import NoPage from './components/NoPage/NoPage';
import Posts from './components/Posts/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route index element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/post" element={<Posts />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
