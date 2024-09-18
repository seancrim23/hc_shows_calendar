import Typography from '@mui/material/Typography';
import AuthForm from "../components/AuthForm";
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';

function AuthPage() {
    return (
        <GridWrapper>
            <Grid container item xs={6} sx={{
                flexGrow: 1,
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '10px'
            }}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <AuthForm method="POST" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Forgot your password?</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link href="/reset">Click Here</Link>
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default AuthPage;