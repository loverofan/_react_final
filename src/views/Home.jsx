import { Outlet, NavLink } from "react-router-dom"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"


function Home() {
    return (
        <>
            <div className="conatiner loginPage vhContainer">
                <div className="navbar">
                    <a href="#">
                        <img src="../public/images/online-todo-list-title.png" alt="" />
                    </a>
                    <img src="../public/images/todo-bg.png" alt="" />
                </div>
                <Outlet />
            </div>

        </>
    )
}

export default Home