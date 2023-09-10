import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


function CheckToken({server, onChangeToken}) {
    const [token, setToken] = useState('')
    const [message, SetMessage] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [uid, setUid] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const cookieValue = document.cookie
        .split(';')
        .find((row) => row.startsWith('hexschoolToken'))
        ?.split('=')[1];
        // console.log("cookieValue===>", cookieValue);
    }, []);

    // useEffect(() => {
    //   console.log(`驗證成功, UID: ${uid}`, `isTokenValid: ${isTokenValid}`);
    // }, [isTokenValid, uid]);

  
    const checkTokenValid = async () => {
  
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() +1);
      // document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`;
      // console.log(
      //   document.cookie
      //   .split('; ')
      //   .find((row) => row.startsWith('hexschoolTodo')),
      // );
  
      const checkOutAPI = `${server}/users/checkout`;
  
      try {
        const res = await axios.get(checkOutAPI, {
          headers: {Authorization: token}
        });
        if (res.data.status == true) {
          const successMessage = `驗證成功, UID: ${res.data.uid}`;
          setIsTokenValid(true);
          SetMessage(successMessage);
          setUid(res.data.uid);
          onChangeToken(token);
          // navigate('../todo');
        }
      } catch (error) {
        const errorMessage = `驗證失敗, 詳細訊息: ${error.message}`;
        SetMessage(errorMessage);
        setIsTokenValid(false);
      }
    }
    return (
        <>
            <h1>驗證</h1>
            <input value={token} placeholder='請輸入token' onChange={(e) => setToken(e.target.value)}/>
            <button onClick={checkTokenValid}>檢查Token</button>
            <p>{message}</p>
        
        </>
    )   
}

CheckToken.propTypes = {
    server: PropTypes.string,
    onChangeToken: PropTypes.func
}

export default CheckToken