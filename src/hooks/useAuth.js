import { useContext } from "react";
import AuthContext from "../context/Authprovider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;