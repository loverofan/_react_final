import { useNavigate } from "react-router-dom";

function NotFound() {

    const navagite = useNavigate()

    return (
        <>
        <div className="navbar">
            <a href="#">
                <img src="images/online-todo-list-title.png" alt="" />
            </a>
        </div>
        <div className="conatiner vhContainer">
                <h1 className="error-hints">Opps, sorry, something has gone wrong.</h1>
                <h1 className="error-hints">Please follow this link to get back on track:</h1>

                <a className="error-hints" href="/_react_final">Back to Sign in page</a>
        </div>

        </>
    )
}


export default NotFound