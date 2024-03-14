import '../styles/index.css'

const LoginForm = (props) => {
    return (
        < section className="m-auto w-1/2 mt-20">
            <h1 className="text-4xl text-yellow-600 font-bold my-5 m-auto w-1/2 text-center">Login</h1>
            <form className="flex flex-col w-1/2 m-auto">
                <label htmlFor="username" className="text-white text-lg">Username</label>
                <input ref={props.username} id="username" className="px-2 py-1 rounded-xl"></input>
                <label html2or="password" className="text-white text-lg">Password</label>
                <input ref={props.pwd} type="password" id="password" className="px-2 py-1 rounded-xl"></input>
                <button onClick={props.loginHandler} className="bg-yellow-600 rounded-xl text-white m-auto mt-5 font-bold px-3 text-xl hover:bg-yellow-200">➡</button>
                <button className="text-white text-start underline hover:cursor-pointer m-2"
                    onClick={() => { props.setIsLogin(false) }}>Register?</button>
            </form>

        </section>
    )
}

export default LoginForm