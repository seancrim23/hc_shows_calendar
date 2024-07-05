import ShowList from "../components/ShowList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function UserShowListPage() {
    const shows = [];
    //loader should pre populate with all shows by user...
    return (
        <div>
            should display a list of shows put on by the user and give user functionality to create / edit / delete
            <p>SHOULD BE TOKEN PROTECTED NO ACCESS WITHOUT LOGIN</p>
            <ShowList shows={shows} noShowsMessage={"No shows currently exist... add a show."} />
        </div>
    )
}

export default UserShowListPage;

//loader to grab all of the shows that have been created by a user
async function loadUserShowList(id) {
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    const response = await fetch(process.env.REACT_APP_BACK_URL + "/shows/" + id);

    if (!response.ok) {
        throw json({ message: "could not find shows for the user."}, {status: 500});
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader({ params }) {
    const id = params.id;

    return defer({
        show: await loadUserShowList(id)
    });
}