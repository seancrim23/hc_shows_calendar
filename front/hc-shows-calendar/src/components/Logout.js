import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//is there a better way to do this?
//future reference for auto loguout - > https://reactrouter.com/en/main/hooks/use-submit
function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        navigate('/', { replace: true });
    }, [navigate]);

    return (<div></div>);
}

export default Logout;