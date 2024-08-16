import { redirect, useRouteLoaderData } from "react-router-dom";
import ShowForm from "../components/ShowForm";

function NewShowPage() {
    const token = useRouteLoaderData('root');

    if (token === "") {
        redirect('/')
    }

    return (
        <div>
            <ShowForm method='POST' />
        </div>
    )
}

export default NewShowPage;