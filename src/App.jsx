
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CheckToken from './components/CheckToken';
import SignOut from './components/SignOut';
import TodoList from './components/TodoList';

function App() {

  const server = 'https://todolist-api.hexschool.io'; //壞惹? 995
  // const server = 'https://todolist-api.hexschool.io/doc';

  const [token, setToken] = useState('')
  const handleChangeToken = (newToken) => {
    return setToken(newToken)
  }

  return (
    <>
      <hr />
        <SignUp server={server} />
      <hr />
        <SignIn server={server} onChangeToken={handleChangeToken} />
      <hr />
        <CheckToken server={server} onChangeToken={handleChangeToken} />
      <hr />
        <SignOut server={server} token={token} onTokenUpdate={handleChangeToken} />
      <hr />
        <TodoList server={server} token={token} />
    </>
  )
}

export default App
