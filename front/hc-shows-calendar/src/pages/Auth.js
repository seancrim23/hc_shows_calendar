import Typography from '@mui/material/Typography';
import AuthForm from "../components/AuthForm";
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';

function AuthPage() {
    return (
        <GridWrapper>
            <Grid container item direction="column" sx={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '10px',
                width:'50%'
            }}>
                <Grid item xs={12}>
                    <AuthForm method="POST" />
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{ textAlign: 'center', paddingTop: '10px' }} variant="subtitle1" gutterBottom>Forgot your password? <Link href="/reset"  >Click Here</Link></Typography>
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default AuthPage;