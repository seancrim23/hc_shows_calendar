import ShowForm from "../components/ShowForm";
import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

function EditShowPage() {
    const { show } = useRouteLoaderData('show-detail');
    console.log(JSON.stringify(show));
    //load show id info
    //const show = {}
    return (
        <div>
            <ShowForm method='PUT' show={show} />
        </div>
    )
}

/*
    const { show } = useRouteLoaderData("show-detail");

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={show}>
                {loadedShow => <Show show={loadedShow} />}
            </Await>
        </Suspense>
    )
*/

export default EditShowPage;