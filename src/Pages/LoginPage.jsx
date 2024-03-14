import "../styles/index.css"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Register } from "../components/Register"
import LoginForm from "../components/LoginForm"
import Header from "../components/Header"

const LoginPage = (props) => {
    const username = useRef(null)
    const pwd = useRef(null)
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const loginHandler = () => {
        if (username.current.value !== "") {
            props.authentication(true)
            props.setUsername(username.current.value)
            navigate('/home/dashboard')
        }
        else alert('Invalid Credentials')
    }

    return (
        <div className="bg-slate-900 h-screen w-screen">
            <Header></Header>
            {isLogin ?
                <LoginForm setIsLogin={setIsLogin} username={username}
                    pwd={pwd} loginHandler={loginHandler}></LoginForm>
                :
                <Register setIsLogin={setIsLogin} ></Register>
            }
        </div >
    )
}

export default LoginPage