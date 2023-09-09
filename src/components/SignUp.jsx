import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';


function SignUp({server}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [message, SetMessage] = useState('');
    
    const signUpAPI = server + '/users/sign_up';

    const signUp = async () => {
      try {
        const res = await axios.post((signUpAPI), {
          email,
          password,
          nickname
        });
        console.log("res====>", res); // check res details
        const successMessage = `註冊成功, UID:  + ${res.data.uid}`;
        SetMessage(successMessage);    
      } catch (error) {
        console.warn(error.response.data); // check error in console
        const errorMessage = `註冊失敗: ${error.message}`;
        SetMessage(errorMessage);
      }
    }

    return(
        <>
        <h1>註冊</h1>
        <label htmlFor="email" 
               className='badge'>Email</label>
        <input type="email" id='email' name='email' placeholder='Email' 
               onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password" 
               className='badge' >Password</label>
        <input type="password" id='password' name='password' placeholder='Password' 
               onChange={(e) => setPassword(e.target.value)}/>

        <label htmlFor="nickname" 
               className='badge'>Nick Name</label>
        <input type="text" id='nickname' name='nickname' placeholder='Nickname' 
               onChange={(e) => setNickname(e.target.value)}/>

        <button className='btn btn-primary' 
          onClick={signUp}>送出註冊</button>
        <p>{message}</p>
        </>
    )
}


SignUp.propTypes = {
    server: PropTypes.string
}


export default SignUp