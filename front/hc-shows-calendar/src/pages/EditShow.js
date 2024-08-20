import ShowForm from "../components/ShowForm";
import { useRouteLoaderData } from "react-router-dom";

function EditShowPage() {
    const { show } = useRouteLoaderData('show-detail');

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