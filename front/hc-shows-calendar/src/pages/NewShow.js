import { redirect, useRouteLoaderData } from "react-router-dom";
import ShowForm from "../components/ShowForm";
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import Grid from '@mui/material/Grid';

function NewShowPage() {
    const token = useRouteLoaderData('root');

    if (token === "") {
        redirect('/')
    }

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
                    <ShowForm method='POST' />
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default NewShowPage;