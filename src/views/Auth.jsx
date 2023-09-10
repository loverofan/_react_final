import { Outlet } from "react-router-dom"
import SignIn from "../components/SignIn";



function Auth() {
    return (
        <>  
            <nav>
                <a href="#"><img src="../public/images/online-todo-list-title.png" alt="" /></a>
                
                <ul>
                    <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                    <li>
                        <a href="" onClick={(e)=> {
                            e.preventDefault()
                            console.log(e.target.value);
                        }}>登出</a>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}


export default Auth