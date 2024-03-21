import "../styles/index.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import Alert from "../components/Alert"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"

const LOGIN_URL = '/login';

const LoginPage = () => {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('')
    const [wait, setWait] = useState(false)

    useEffect(() => {
        if (auth.uid) navigate('/dashboard');
    })

    const loginHandler = async (e) => {
        e.preventDefault()
        setWait(true)
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ uid: user, pwd: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setWait(false)
            const accessToken = response?.data?.accessToken;
            const uid = response?.data?.uid;
            setAuth({ uid, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate('/dashboard', { replace: true })
        } catch (err) {
            setWait(false)
            if (!err?.response) setErrMsg('No Server Response');
            else if (err.response?.status === 400) setErrMsg('Missing Username or Passwored');
            else if (err.response?.status === 401) setErrMsg('Unauthorized');
            else setErrMsg('Login Failed');
            setTimeout(() => {
                setErrMsg('')
            }, 5000)
        }
    }

    return (
        <main className="bg-slate-900 h-screen w-screen">
            <Header />
            {wait ? <Alert message={"Waiting for Response from DB"} type={"wait"}></Alert> : null}
            {errMsg ? <Alert message={errMsg} type={"error"}></Alert> : null}
            < section className="m-auto w-1/2 mt-20">
                <h1 className="text-4xl text-yellow-600 font-bold my-5 m-auto w-1/2 text-center">Login</h1>
                <form className="flex flex-col w-1/2 m-auto">
                    <label htmlFor="username" className="text-white text-lg">Username</label>
                    <input onChange={(e) => { setUser(e.target.value) }} autoComplete="off"
                        id="username" className="px-2 py-1 rounded-xl"></input>
                    <label html2or="password" className="text-white text-lg">Password</label>
                    <input onChange={(e) => { setPwd(e.target.value) }} autoComplete="off"
                        type="password" id="password" className="px-2 py-1 rounded-xl"></input>
                    <button onClick={loginHandler} className="bg-yellow-600 rounded-xl text-white m-auto mt-5 font-bold px-3 text-xl hover:bg-yellow-200">➡</button>
                    <button className="text-white text-start underline hover:cursor-pointer m-2"
                        onClick={() => { navigate('/register') }}>Register?</button>
                </form>

            </section>
        </main >
    )
}

export default LoginPage