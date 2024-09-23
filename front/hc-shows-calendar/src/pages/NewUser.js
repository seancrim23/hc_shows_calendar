import Typography from '@mui/material/Typography';
import UserForm from "../components/UserForm";
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import Grid from '@mui/material/Grid';

function NewUserPage() {
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
                width: '50%'
            }}>
                <Grid item xs={12}>
                    <Typography sx={{ textAlign: 'center', paddingTop: '10px' }} variant="h4" gutterBottom>Create User</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserForm />
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default NewUserPage;