
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
import './assets/styles/styles.scss';
import NotFound from './views/NotFound';



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

  return (
    <>
    <div className="vhContainer vwContianer">
      <div className="bg-yellow">
        <Routes>
        <Route path='/' element={<Home />} >
          <Route path='/' element={<SignIn server={server} onChangeToken={handleChangeToken} />} />
          <Route path='/sign_up' element={<SignUp server={server} />} />
        </Route>

          <Route path='/auth' element={<Auth />} >
          <Route path='/auth/check_token' element={<CheckToken server={server} onChangeToken={handleChangeToken} />} />
            <Route path='/auth/todo' element={<TodoList server={server} token={token} />} />
          </Route>

          <Route path='*' element={<NotFound />} />

      </Routes>
      </div>
    </div>
    </>
  )
}

export default App
