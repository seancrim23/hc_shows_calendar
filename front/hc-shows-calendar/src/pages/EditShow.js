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

export default EditShowPage;