import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth({accessToken: response.data.accessToken, uid: response.data.uid, hasReceivedStarters: 
            response.data.hasReceivedStarters})
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;