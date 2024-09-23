import ShowForm from "../components/ShowForm";
import { useRouteLoaderData } from "react-router-dom";
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function EditShowPage() {
    const { show } = useRouteLoaderData('show-detail');

    /*
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>{showSubmitMethod} a Show</Typography>
                    <Divider sx={{ marginTop: 1.5, marginBottom: 1.5}} />
    */

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
            }}>
                <Grid item xs={12}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Edit a Show</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ marginTop: 1.5, marginBottom: 1.5 }} />
                </Grid>
                <Grid item xs={12}>
                    <ShowForm method='PUT' show={show} />
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default EditShowPage;