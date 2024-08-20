import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Show from "../components/Show";
import { getAuthToken } from "../util/auth";

function ShowDetailPage() {
    const { show } = useRouteLoaderData("show-detail");
    const token = useRouteLoaderData('root');

    const canEdit = token !== null;

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={show}>
                {loadedShow => <Show show={loadedShow} canEdit={canEdit}/>}
            </Await>
        </Suspense>
    )
}

export default ShowDetailPage;

async function loadShow(id) {
    //implement to hit db to load show by id
    const response = await fetch(process.env.REACT_APP_BACK_URL + "/show/" + id);

    if (!response.ok) {
        throw json({ message: "could not find show." }, { status: 500 });
    } else {
        const resData = await response.json();
        console.log(resData);
        return resData;
    }
}

export async function loader({ params }) {
    const id = params.id;

    return defer({
        show: await loadShow(id)
    })
}

export async function action({ request, params }) {
    console.log("in delete action...")
    console.log(params)
    console.log(request)
    const data = await request.formData();
    const showId = data.get('showId');
    //const token = getAuthToken();
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT

    const token = getAuthToken();
    const response = await fetch(process.env.REACT_APP_BACK_URL + "/show/" + showId, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw json({ message: 'could not delete selected show.' }, { status: 500 });
    }

    return redirect('/user/shows');
}