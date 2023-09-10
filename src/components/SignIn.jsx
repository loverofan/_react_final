import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";


function SignIn({server, onChangeToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, SetMessage] = useState('');

    const [hasSignIn, setHasSignIn] = useState(false);
    const [isLoading, setisLoading] = useState(false) // status


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
            setisLoading(true);
            const res = await axios.post((signInAPI), signInData);

            const successMessage = res.data.status ? '登入成功!' : '登入失敗';
            console.log("token===>", res.data.token);
            setToken(res.data.token)
            SetMessage(successMessage);
            console.log(successMessage);
            setHasSignIn(true);

            onChangeToken(token);
            document.cookie = `hexschoolToken=${res.data.token}`;
            setTimeout(() => {
                setisLoading(false)
            }, 500)
            // navigate('../check_token');
            navigate('../auth/todo');


        } catch (error) {
          console.warn(error.response.data); // check error in console
          const errorMessage = `登入失敗: ${error.message}`;
          SetMessage(errorMessage);
          setTimeout(() => {
            setisLoading(false)
        }, 500)
        }
    }

    return(
        <form className='formControls'>
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
            <label htmlFor="signInEmail" className='formControls_label'>Email</label>
            <input type="email" className='formControls_input' id='signInEmail' name='email' placeholder='請輸入Email' 
                onChange={HandleChange}/>
            {signInData.email.length < 1 && <p className="error-message">此欄位不可為空</p>}

            <label htmlFor="signInPassword" className='formControls_label' >密碼</label>
            <input type="password" className='formControls_input' id='signInPassword' name='password' placeholder='請輸入密碼' 
                onChange={HandleChange}/>

            <button className='formControls_btnSubmit' type='button' 
                    disabled={isLoading}
                    onClick={signIn}>登入</button>
            <NavLink to="/sign_up" className='formControls_btnLink'>
                註冊帳號
            </NavLink>
            {/* <p>{message}</p> */}
            {/* {hasSignIn ? <p> Token: {token} </p> : null } */}
            
        </form>
    )
}


SignIn.propTypes = {
    server: PropTypes.string, 
    onChangeToken: PropTypes.func
}


export default SignIn