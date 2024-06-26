import ShowForm from "../components/ShowForm";

function NewShowPage() {
    return (
        <div>
            new show page
            <ShowForm />
            <p>SHOULD BE TOKEN PROTECTED NO ACCESS WITHOUT LOGIN</p>
        </div>
    )
}

export default NewShowPage;