import ShowList from "../components/ShowList";

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