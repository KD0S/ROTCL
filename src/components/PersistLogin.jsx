/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <div>
            {isLoading
                ? <div className="bg-slate-900 w-screen h-screen text-yellow-600 text-center">Loading...</div>
                : <Outlet />
            }
        </div>
    )
}

export default PersistLogin;