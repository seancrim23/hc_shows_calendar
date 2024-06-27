import ShowForm from "../components/ShowForm";

function NewShowPage() {
    return (
        <div>
            <ShowForm />
            <p>SHOULD BE TOKEN PROTECTED NO ACCESS WITHOUT LOGIN</p>
        </div>
    )
}

export default NewShowPage;