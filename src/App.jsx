
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CheckToken from './components/CheckToken';
import SignOut from './components/SignOut';
import TodoList from './components/TodoList';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Auth from './views/Auth';


function App() {

  const server = 'https://todolist-api.hexschool.io'; //壞惹? 995
  // const server = 'https://todolist-api.hexschool.io/doc';


  const {VITE_APP_HOST} = import.meta.env;

  // console.log(import.meta.env);
  // console.log("VITE_APP_HOST===>", import.meta.env);



  const [token, setToken] = useState('')
  const handleChangeToken = (newToken) => {
    return setToken(newToken)
  }


  const style = (({isActive}) => {
    return {
      color: isActive ? 'red' : ''
    }
  })

  return (
    <>
    <h1>
      <nav>
        <NavLink to="/" style={style}>首頁</NavLink> |
        <NavLink to="/about" style={style}>About</NavLink> |
        <NavLink to="/auth/sign_up" style={style}>註冊</NavLink> |
        <NavLink to="/auth/sign_in" style={style}>登入</NavLink> |
        <NavLink to='auth/check_token' style={style}>檢查Token</NavLink> |
        <NavLink to="/auth/todo" style={style}>Todo</NavLink>



      </nav>
    </h1>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />}>
          <Route path='sign_up' element={<SignUp server={server} />} />
          <Route path='sign_in' element={<SignIn server={server} onChangeToken={handleChangeToken} />} />
          <Route path='check_token' element={<CheckToken server={server} onChangeToken={handleChangeToken} />} />
          <Route path='todo' element={<TodoList server={server} token={token} />} />


        </Route>

    </Routes>
      {/* <hr />
        <SignUp server={server} />
      <hr />
        <SignIn server={server} onChangeToken={handleChangeToken} />
      <hr />
        <CheckToken server={server} onChangeToken={handleChangeToken} />
      <hr />
        <SignOut server={server} token={token} onTokenUpdate={handleChangeToken} />
      <hr />
        <TodoList server={server} token={token} /> */}
    </>
  )
}

export default App
