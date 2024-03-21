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
    const [wait, setWait] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault()
        setWait(true)
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ uid: username.current.value, pwd: pwd.current.value }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setWait(false)
            const accessToken = response?.data?.accessToken;
            props.authentication(true)
            props.setUsername(username.current.value)
            navigate('/home/dashboard')
        } catch (err) {
            setWait(false)
            setErrMsg(err.message)
            setTimeout(() => {
                setErrMsg('')
            }, 5000)
        }
    }

    return (
        <div className="bg-slate-900 h-screen w-screen">
            <Header></Header>
            {wait ? <Alert message={"Waiting for Response from DB"} type={"wait"}></Alert> : null}
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