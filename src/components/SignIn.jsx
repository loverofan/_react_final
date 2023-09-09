

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

function SignIn({server, onChangeToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, SetMessage] = useState('');
    const [hasSignIn, setHasSignIn] = useState(false);
    const signInAPI = `${server}/users/sign_in`;
    // test090502@gmail.ccc
    // 1qaz2wsx
    // test090502

    const signIn = async () => {
        try {
            const res = await axios.post((signInAPI), {
                email,
                password
            });

            const successMessage = res.data.status ? '登入成功!' : '登入失敗';
            setToken(res.data.token)
            SetMessage(successMessage);
            console.log(successMessage);
            setHasSignIn(true);

            onChangeToken(token);

        } catch (error) {
          console.warn(error.response.data); // check error in console
          const errorMessage = `登入失敗: ${error.message}`;
          SetMessage(errorMessage);
        }
    }

    return(
        <>  <h1>登入</h1>
            <label htmlFor="signInEmail" className='badge'>Email</label>
            <input type="email" id='signInEmail' name='email' placeholder='Email' 
                   onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="signInPassword" className='badge' >Password</label>
            <input type="password" id='signInPassword' name='password' placeholder='Password' 
                   onChange={(e) => setPassword(e.target.value)}/>

        <button className='btn btn-primary' 
          onClick={signIn}>登入</button>
        <p>{message}</p>
        {hasSignIn ? <p> Token: {token} </p> : null }
        </>
    )
}


SignIn.propTypes = {
    server: PropTypes.string, 
    onChangeToken: PropTypes.func
}


export default SignIn