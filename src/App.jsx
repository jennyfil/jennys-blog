import React,{ useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { Api } from './utils/api';
import { path, sortPosts } from './utils/constants';
import Header from './components/Header/Header';
import StartPage from './components/StartPage/StartPage';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Profile from './pages/Profile/Profile';
import Context from '../src/context/context';
import MainForm from './components/Form/MainForm';
import Home from './pages/Home/Home';
import AddPost from './pages/AddPost/AddPost';
import Post from './pages/Post/Post';
import Authors from './pages/Authors/Authors';
import Author from './pages/Author/Author';
import MyPosts from './pages/MyPosts/MyPosts';
import FavoritePosts from './pages/FavoritePosts/FavoritePosts';
import MyComments from './pages/MyComments/MyComments';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || '');
  const [token, setToken] = useState(localStorage.getItem("token") || '');
  const [api, setApi] = useState(new Api(token));

  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [postsByText, setPostsByText] = useState([]);
  const [myComments, setMyComments] = useState([]);
  
  const year = new Date().getFullYear();

  useEffect(() => {
    setApi(new Api(token));
  }, [token]);

  useEffect(() => {
    if (token) {
      api.getAllPosts()
        .then(posts => {
          sortPosts(posts);
          setPosts(posts);
        })
      api.getAllComments()
        .then(data => {
          setMyComments(data.filter(comment => comment.author._id === JSON.parse(user)._id));
        })
    }
  }, [api]);


  useEffect(() => {
    let authorsArr = [];
    posts.forEach(post => {
        if (!authorsArr.filter(el => el._id === post.author._id).length) {
            if (post.author.name !== "Иван Иванов") {
              authorsArr.push(post.author);
            }
        }
    });
    authorsArr.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });
    setAuthors(authorsArr);
}, [posts])

  return (
    <Context.Provider value={{
      api,
      setApi,
      user,
      setUser,
      token,
      setToken,
      loggedIn,
      setLoggedIn,
      posts,
      setPosts,
      authors,
      setAuthors,
      searchQuery,
      setSearchQuery,
      postsByText,
      setPostsByText,
      myComments,
      setMyComments
    }}>
      <Header />

      <main>
        <Routes>
          <Route path={path} element={<StartPage />} />
          <Route path={path + 'home'} element={<Home />} />
          <Route path={path + 'add'} element={<AddPost />} />
          <Route path={path + 'modify/:id'} element={<AddPost />} />
          <Route path={path + "posts/:id"} element={<Post />} />
          <Route path={path + "profile"} element={<Profile />} />
          <Route path={path + 'home'} element={<Search />} />
          <Route path={path + "authors"} element={<Authors />} />
          <Route path={path + "author/:id"} element={<Author />} />
          <Route path={path + "my-posts"} element={<MyPosts />} />
          <Route path={path + "favorite"} element={<FavoritePosts />} />
          <Route path={path + "my-comments"} element={<MyComments />} />
        </Routes>
      </main>
      
      <Footer year={year} />
      <MainForm type='auth' />
    </Context.Provider>
  );
}

export default App;

