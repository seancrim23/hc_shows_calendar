import User from "../components/User";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

function UserDetailPage() {
    const { user } = useRouteLoaderData("user-detail");

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={user}>
                {loadedUser => <User user={loadedUser} />}
            </Await>
        </Suspense>
    )
}

export default UserDetailPage;

//loader to grab and display user's info
//will allow user to edit their profile info and change password
async function loadUserDetail(id) {
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    const response = await fetch(process.env.REACT_APP_BACK_URL + "/user/" + id);

    if (!response.ok) {
        throw json({ message: "could not find user."}, {status: 500});
    } else {
        const resData = await response.json();
        return resData;
    }
}

//should have to pull the id from cookies after user login
export async function loader({ params }) {
    let id = params.id;

    //hardcode for now
    //TODO implement login and have loader pull id from cookies?
    //id should only be available after successful login
    id = "cooltestpromoter123"

    return defer({
        user: await loadUserDetail(id)
    });
}