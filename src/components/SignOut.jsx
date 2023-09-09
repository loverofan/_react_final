import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';


function SignOut({server, token, onTokenUpdate}) {

    const [message, SetMessage] = useState('');
    const [newToken, setNewToken] = useState('');
    const signOutAPI = `${server}/users/sign_out`;

    const signOut = async() => {
        try {
            const res = await axios.post(
                signOutAPI, 
                {},
                {headers: {Authorization: token},}
            )
            const successMessage = `登出況狀: ", ${res.data.message}`;
            
            SetMessage(successMessage);
            onTokenUpdate('');
        } catch (error) {
            const errorMessage = `驗證失敗, 詳細訊息: ${error.message}`;
            SetMessage(errorMessage);
        }
    }

    return(
        
        <>
            <h1>登出</h1>
            <input placeholder='請輸入token' onChange={(e) => setNewToken(e.target.value)}/>
            <button onClick={signOut}> 登出</button>
            <p>{message}</p>
        </>
    )
}

SignOut.propTypes = {
    server: PropTypes.string,
    token: PropTypes.string,
    onTokenUpdate: PropTypes.func.isRequired
}


export default SignOut