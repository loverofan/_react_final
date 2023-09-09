import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


function SignUp({server}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [message, SetMessage] = useState('');
    const navigate = useNavigate();
    
    const signUpAPI = server + '/users/sign_up';

    const [signUpData, setSignUpData] = useState({
       email: '',
       password: '',
       nickname: ''
    })

   function HandleChange(e) {
       const {name, value} = e.target;
       setSignUpData({
           ...signUpData,
           [name]: value
       })
   }

    const signUp = async () => {
      try {
        const res = await axios.post((signUpAPI), signUpData);
       //  console.log("res====>", res); // check res details
        const successMessage = `註冊成功, UID:  + ${res.data.uid}`;
        SetMessage(successMessage);
        console.log("signUpData==>", signUpData);
        navigate('../sign_in');
        
      } catch (error) {
        console.warn(error.response.data); // check error in console
        const errorMessage = `註冊失敗: ${error.message}`;
        SetMessage(errorMessage);
      }
    }

    return(
        <>
        <h1>註冊
               {/* {JSON.stringify(signUpData)}  */}
        </h1>
       <form action="">

              <label htmlFor="email" 
                     className='badge'>Email</label>
              <input type="email" id='email' name='email' placeholder='Email' 
                     onChange={HandleChange}/>

              <label htmlFor="password" 
                     className='badge' >Password</label>
              <input type="password" id='password' name='password' placeholder='Password' 
                     onChange={HandleChange}/>

              <label htmlFor="nickname" 
                     className='badge'>Nick Name</label>
              <input type="text" id='nickname' name='nickname' placeholder='Nickname' 
                     onChange={HandleChange}/>

              <button className='btn btn-primary' 
                      type="button"
                      onClick={signUp}>送出註冊</button>
              <p>{message}</p>
        </form>
        </>
    )
}


SignUp.propTypes = {
    server: PropTypes.string
}


export default SignUp