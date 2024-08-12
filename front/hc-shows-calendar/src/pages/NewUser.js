import Typography from '@mui/material/Typography';
import UserForm from "../components/UserForm";

function NewUserPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>Create User</Typography>
            <UserForm />
        </div>
    )
}

export default NewUserPage;