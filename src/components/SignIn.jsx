

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function SignIn({server, onChangeToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, SetMessage] = useState('');
    const [hasSignIn, setHasSignIn] = useState(false);
    const signInAPI = `${server}/users/sign_in`;
    const navigate = useNavigate();

    // qqqq@ggg.com
    // 123456
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
     })
 
    function HandleChange(e) {
        const {name, value} = e.target;
        setSignInData({
            ...signInData,
            [name]: value
        })
    }

    const signIn = async () => {
        try {
            const res = await axios.post((signInAPI), signInData);

            const successMessage = res.data.status ? '登入成功!' : '登入失敗';
            console.log("token===>", res.data.token);
            setToken(res.data.token)
            SetMessage(successMessage);
            console.log(successMessage);
            setHasSignIn(true);

            onChangeToken(token);
            navigate('../check_token');

        } catch (error) {
          console.warn(error.response.data); // check error in console
          const errorMessage = `登入失敗: ${error.message}`;
          SetMessage(errorMessage);
        }
    }

    return(
        <>
            <h1>登入</h1>
            <form action="">

            <label htmlFor="signInEmail" className='badge'>Email</label>
            <input type="email" id='signInEmail' name='email' placeholder='Email' 
                   onChange={HandleChange}/>

            <label htmlFor="signInPassword" className='badge' >Password</label>
            <input type="password" id='signInPassword' name='password' placeholder='Password' 
                   onChange={HandleChange}/>

            <button className='btn btn-primary' type='button' 
                    onClick={signIn}>登入</button>
            <p>{message}</p>
            {hasSignIn ? <p> Token: {token} </p> : null }
            </form>
        </>
    )
}


SignIn.propTypes = {
    server: PropTypes.string, 
    onChangeToken: PropTypes.func
}


export default SignIn