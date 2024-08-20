import Logout from "../components/Logout";

function LogoutPage() {
    return (
        <div><Logout /></div>
    )
}

export default LogoutPage;

/*export function action() {
    console.log("logout action is firing");
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');
}*/