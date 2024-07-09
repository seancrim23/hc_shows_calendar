import ShowList from "../components/ShowList";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import { Suspense } from "react";

function UserShowListPage() {
    const { showList } = useRouteLoaderData("user-show-list");

    return (
        <>
            <h4>User Show List</h4>
            <Button underline="none" component="button" color="inherit" href={`/shows/new`}>Create New Show</Button>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={showList}>
                    {loadedShowList => <ShowList shows={loadedShowList} noShowsMessage={"No shows currently exist... add a show."} isPromoter={true} />}
                </Await>
            </Suspense>
        </>
    )
}

export default UserShowListPage;

//loader to grab all of the shows that have been created by a user
async function loadUserShowList(id) {
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    const response = await fetch(process.env.REACT_APP_BACK_URL + "/show?promoter=" + encodeURIComponent(id));

    if (!response.ok) {
        throw json({ message: "could not find shows for the user." }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader({ params }) {
    let id = params.id;

    //hardcode for now
    //TODO implement login and have loader pull id from cookies?
    //id should only be available after successful login
    id = "cooltestpromoter123"

    return defer({
        showList: await loadUserShowList(id)
    });
}