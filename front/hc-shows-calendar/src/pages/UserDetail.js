import ShowList from "../components/ShowList";
import User from "../components/User";

function UserDetailPage() {
    //this will contain all of the user profile info if they need to update it or anything...
    //user can log in and see all of their upcoming shows and have functionality to add / edit / delete shows
    return (
        <div>
            <User />
            <ShowList />
        </div>
    )
}

export default UserDetailPage;