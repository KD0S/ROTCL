import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"

export const SideNav = ({ socket }) => {

    const logout = useLogout()
    const navigate = useNavigate()

    const handleSignout = async () => {
        await logout();
        socket.disconnect();
        navigate('/login');
    }

    return (
        <div className="h-screen left-0 w-40 bg-slate-700
        p-4 flex flex-col">
            <h1 className="text-slate-900 text-4xl font-bold my-4">ROTCL</h1>
            <section className="flex flex-col gap-4 h-4/5 min-w-full my-2 py-5">
                <div className="rounded-md px-2 py-1
                text-white font-bold cursor-pointer hover:bg-slate-900">Home</div>
                <div className="rounded-md px-2 py-1
                text-white font-bold cursor-pointer hover:bg-slate-900">Monsters</div>
            </section>
            <button className="size-12 bg-red-600 rounded-md
            text-white mx-auto hover:bg-red-500 transition-all"
                onClick={handleSignout}>
                <FontAwesomeIcon size='lg' icon={faSignOutAlt} />
            </button>
        </div>
    )
}
