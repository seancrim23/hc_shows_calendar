import Typography from '@mui/material/Typography';
import AuthForm from "../components/AuthForm";

function NewAuthPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>Create User</Typography>
            <AuthForm method="PUT" />
        </div>
    )
}

export default NewAuthPage;