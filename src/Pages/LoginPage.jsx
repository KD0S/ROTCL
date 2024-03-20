import "../styles/index.css"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Register } from "../components/Register"
import LoginForm from "../components/LoginForm"
import Header from "../components/Header"
import axios from "../api/axios"
import Alert from "../components/Alert"

const LoginPage = (props) => {
    const LOGIN_URL = '/login';

    const username = useRef(null)
    const pwd = useRef(null)
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [errMsg, setErrMsg] = useState('')

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ uid: username.current.value, pwd: pwd.current.value }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const accessToken = response?.data?.accessToken;
            props.authentication(true)
            props.setUsername(username.current.value)
            navigate('/home/dashboard')
        } catch (err) {
            setErrMsg(err.message)
            setTimeout(() => {
                setErrMsg('')
            }, 5000)
        }
    }

    return (
        <div className="bg-slate-900 h-screen w-screen">
            <Header></Header>
            {errMsg ? <Alert message={errMsg} type={"error"}></Alert> : null}
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