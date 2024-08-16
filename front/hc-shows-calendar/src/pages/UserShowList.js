import ShowList from "../components/ShowList";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

function UserShowListPage() {
    const { showList } = useRouteLoaderData("user-show-list");
    const token = useRouteLoaderData('root');

    const isPromoter = token !== "";

    return (
        <>
            <h4>User Show List</h4>
            <Button underline="none" component="button" color="inherit" href={`/shows/new`}>Create New Show</Button>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={showList}>
                    {loadedShowList => <ShowList shows={loadedShowList} noShowsMessage={"You haven't created any shows yet... add a show."} isPromoter={isPromoter} />}
                </Await>
            </Suspense>
        </>
    )
}

export default UserShowListPage;

//loader to grab all of the shows that have been created by a user
async function loadUserShowList() {
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    const token = getAuthToken();
    const url = process.env.REACT_APP_BACK_URL + "/user/shows"
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

    if (!response.ok) {
        throw json({ message: "could not find shows for the user." }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return defer({
        showList: await loadUserShowList()
    });
}