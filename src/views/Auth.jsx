import { Outlet } from "react-router-dom"



function Auth() {
    return (
        <>
            <h1>Auth頁面</h1>
            <h2>共用區塊</h2>
            <Outlet />
        </>
    )
}


export default Auth