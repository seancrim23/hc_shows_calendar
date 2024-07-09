import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';

function RootLayout() {
    return <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={0}
        direction="column"
        sx={{ background: '#636363' }}>
        <Header />
        <Outlet />
        <Footer />
    </Grid>
}

export default RootLayout;

