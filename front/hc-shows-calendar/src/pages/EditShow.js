import ShowForm from "../components/ShowForm";

function EditShowPage() {
    //load show id info
    const show = {}
    return (
        <div>
            <ShowForm method='PUT' show={show} />
        </div>
    )
}

export default EditShowPage;