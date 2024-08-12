import Typography from '@mui/material/Typography';
import AuthForm from "../components/AuthForm";

function AuthPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>Login</Typography>
            <AuthForm method="POST" />
            <div>
                <p>Forgot your password?</p>
                <a href="/reset">Click Here</a>
            </div>
        </div>
    )
}

export default AuthPage;