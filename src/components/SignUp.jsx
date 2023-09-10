import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from "react-router-dom";


function SignUp({server}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [passwordMatched, setPasswordMatched] = useState(false);
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

   const handlePasswordAgainChange = (e) => {
          const newPasswordAgain = e.target.value;
       setPasswordAgain(newPasswordAgain);
       setPasswordMatched(signUpData.password === newPasswordAgain);
   }



    const signUp = async () => {
      try {
        const res = await axios.post((signUpAPI), signUpData);
       //  console.log("res====>", res); // check res details
        const successMessage = `註冊成功, UID:  + ${res.data.uid}`;
        SetMessage(successMessage);
        console.log("signUpData==>", signUpData);
        alert('註冊成功');
        navigate('..'); // to todos
        
      } catch (error) {
        console.warn(error.response.data); // check error in console
        console.log(error.response);
        const errorMessage = `註冊失敗: ${error.message}`;
        const alertMessage = JSON.stringify(error.response.data.message)
        alert(alertMessage);
        SetMessage(errorMessage);
        
      }
    }

    return(
       <form className='formControls'>
       <h2 className="formControls_txt">註冊帳號</h2>
       <label htmlFor="email" 
                     className='formControls_label'>Email</label>
              <input type="email" id='email' name='email' placeholder='請輸入 Email' className="formControls_input"
                     onChange={HandleChange}/>

              <label htmlFor="nickname" 
                     className='formControls_label'>您的暱稱</label>
              <input type="text" id='nickname' name='nickname' placeholder='請輸入您的暱稱' className="formControls_input"
                     onChange={HandleChange}/>

              <label htmlFor="password" 
                     className='formControls_label' >密碼</label>
              <input type="password" id='password' name='password' placeholder='請輸入密碼' className="formControls_input"
                     onChange={HandleChange}/>
              
              <label htmlFor="passwordAgain" 
                     className='formControls_label' >再次輸入密碼</label>
              <input type="password" id='passwordAgain' name='passwordAgain' placeholder='請再次輸入密碼' className="formControls_input"
                     onChange={handlePasswordAgainChange}/>
              {!passwordMatched && signUpData.password.length > 0 && passwordAgain.length > 0 &&
                <p className="error-message">密碼不相符
                </p>}

              <button className='formControls_btnSubmit' 
                      type="button"
                      onClick={signUp}>送出註冊</button>
              <NavLink to=".." className='formControls_btnLink'>
                     已有帳號
              </NavLink>
              {/* <p>{message}</p> */}
       
       </form>
    )
}


SignUp.propTypes = {
    server: PropTypes.string
}


export default SignUp