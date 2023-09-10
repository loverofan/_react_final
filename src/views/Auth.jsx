import { Outlet, useNavigate } from "react-router-dom"
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { useState } from "react";



function Auth({server, token, onTokenUpdate, userName}) {


    const [message, SetMessage] = useState('');
    const [newToken, setNewToken] = useState('');
    const signOutAPI = `${server}/users/sign_out`;
    const navigate = useNavigate();

    console.log("userName====>", userName);

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
            setTimeout(() => {
                alert('登出成功...頁面跳轉中')
                navigate('/')
            },500)
        } catch (error) {
            const errorMessage = `驗證失敗, 詳細訊息: ${error.message}`;
            SetMessage(errorMessage);
        }
    }


    return (
        <>  
            <nav>
                <a href="#"><img src="../public/images/online-todo-list-title.png" alt="" /></a>
                
                <ul>
                    <li className="todo_sm"><a href="#"><span>{userName} 的待辦事項</span></a></li>
                    <li>
                        <a href="" onClick={signOut}>登出</a>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}


export default Auth