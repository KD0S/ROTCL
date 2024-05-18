import { useEffect, useRef, useState } from "react";
import "../styles/index.css"
import "../api/axios"
import axios from "../api/axios";
import Alert from "./Alert";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/
const EMAIL_REGEX = /^[a-z0-9-.#]+@[a-z]+\.[a-z]{2,3}$/

export const Register = () => {
    const emailRef = useRef();
    const REGISTER_URL = 'register';

    const { auth } = useAuth();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState('');
    const [matchFocus, setMatchFocus] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [wait, setWait] = useState(false)

    useEffect(() => {
        if (auth.uid) navigate('/dashboard')
    })

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email.toLowerCase());
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            setWait(true)
            await axios.post(REGISTER_URL,
                JSON.stringify({ uid: user, pwd: pwd, email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setWait(false)
            setUser('');
            setPwd('');
            setEmail('');
            setSuccess(true);
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } catch (err) {
            setErrMsg(err.message)
        }
    }

    return (
        <main className="h-screen w-screen bg-slate-900">
            <Header></Header>
            <section className="m-auto mt-10 w-1/2">
                {errMsg ? <Alert message={errMsg} type={"error"}></Alert> : null}
                {success ? <Alert message={"Registration Successfull! Redirecting to Login..."}
                    type={"success"}></Alert> : null}
                {wait ? <Alert message={"Waiting for Response from DB..."} type={"wait"}></Alert> : null}
                <h1 className="text-yellow-600 text-4xl font-bold text-center">Register</h1>
                <form className="flex w-1/2 flex-col m-auto mt-5">
                    <label className="text-white" htmlFor="email">Email Address
                        <span className={!validEmail ? "bg-red-600 px-0.5 mx-2 rounded-md" : "hidden"}>✖</span>
                        <span className={validEmail ? "bg-green-700 font-white px-0.5 mx-2 rounded-md" : "hidden"}>✔</span>
                    </label>
                    <input type="email" id="email" ref={emailRef} autoComplete="off"
                        onChange={(e) => { setEmail(e.target.value) }}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote" onFocus={() => { setEmailFocus(true) }}
                        onBlur={() => { setEmailFocus(false) }}
                        className="rounded-lg px-2 py-1"
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ?
                        "bg-black rounded-xl text-white p-3 m-4" : "hidden"}>
                        Must be a valid Email Address.
                    </p>
                    <label className="text-white" htmlFor="username">Username
                        <span className={!validName ? "bg-red-600 px-0.5 mx-2 rounded-md" : "hidden"}>✖</span>
                        <span className={validName ? "bg-green-700 font-white px-0.5 mx-2 rounded-md" : "hidden"}>✔</span>
                    </label>
                    <input type="text" id="username" autoComplete="off"
                        onChange={(e) => { setUser(e.target.value) }} required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote" onFocus={() => { setUserFocus(true) }}
                        onBlur={() => { setUserFocus(false) }}
                        className="rounded-lg px-2 py-1" />
                    <p id="uidnote" className={userFocus && user && !validName ?
                        "bg-black rounded-xl text-white p-3 m-4" : "hidden "}>
                        2 to 12 characters.<br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label className="text-white" htmlFor="password">Password
                        <span className={!validPwd ? "bg-red-600 px-0.5 mx-2 rounded-md" : "hidden"}>✖</span>
                        <span className={validPwd ? "bg-green-700 font-white px-0.5 mx-2 rounded-md" : "hidden"}>✔</span>
                    </label>

                    <input id="password" type="password" autoComplete="off"
                        onChange={(e) => { setPwd(e.target.value) }} required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote" onFocus={() => { setPwdFocus(true) }}
                        onBlur={() => { setPwdFocus(false) }}
                        className="rounded-lg px-2 py-1" />
                    <p id="pwdnote" className={pwdFocus && !validPwd ?
                        "bg-black text-white rounded-xl p-3 m-4" : "hidden"}>
                        8 to 20 Characters. <br />
                        Must include uppercase and lowercase letters, a number and
                        a special character. <br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                    </p>

                    <label className="text-white" htmlFor="confirm_pwd">
                        Confirm Password
                        <span className={validMatch || !matchPwd ? "hidden" : "bg-red-600 font-white px-0.5 mx-2 rounded-md"}>✖</span>
                        <span className={validMatch && matchPwd ? "bg-green-700 font-white px-0.5 mx-2 rounded-md" : "hidden"}>✔</span>
                    </label>
                    <input type="password"
                        id="confirm_pwd" autoComplete="off" required
                        onChange={(e) => { setMatchPwd(e.target.value) }}
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote" onFocus={() => { setMatchFocus(true) }}
                        onBlur={() => { setMatchFocus(false) }}
                        className="rounded-lg px-2 py-1"
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ?
                        "bg-black text-white rounded-xl p-3 m-4" : "hidden"}>
                        Must match the password input field.
                    </p>
                    <button disabled={!validName || !validPwd || !validMatch}
                        className="text-white bg-yellow-600 rounded-lg 
                m-auto mt-5 font-bold p-2 disabled:opacity-45"
                        onClick={handleSignup}>Sign Up</button>
                    <p className="text-white mt-5">Already Registered?</p>
                    <p className="text-white underline hover:cursor-pointer"
                        onClick={() => { navigate('/login') }}>Sign in</p>
                </form>
            </section >
        </main>
    )
}

export default Register