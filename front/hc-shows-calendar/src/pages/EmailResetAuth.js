import UserAdminForm from "../components/UserAdminForm";

function EmailResetAuthPage() {
    return (
        <div>
            <h1>Enter email to reset your password</h1>
            <UserAdminForm type="reset" />
        </div>
    );
}

export default EmailResetAuthPage;