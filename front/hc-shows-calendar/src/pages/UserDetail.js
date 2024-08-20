import User from "../components/User";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

function UserDetailPage() {
    const { user } = useRouteLoaderData("user-detail");
    const token = useRouteLoaderData('root');

    const isPromoter = token !== null;

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={user}>
                {loadedUser => <User user={loadedUser} isPromoter={isPromoter} />}
            </Await>
        </Suspense>
    )
}

export default UserDetailPage;

async function loadUserDetail() {
    const token = getAuthToken();
    const url = process.env.REACT_APP_BACK_URL + "/user"
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

    if (!response.ok) {
        throw json({ message: "could not find user."}, {status: 500});
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return defer({
        user: await loadUserDetail()
    });
}