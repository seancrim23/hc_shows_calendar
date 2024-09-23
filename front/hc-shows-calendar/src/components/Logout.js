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

//this does not seem like a good way to do this
//TODO look into better way if there is one
export function action() {
    console.log("logout action is firing");
    return "logout :)"
}