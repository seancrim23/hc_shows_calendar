import { Outlet, useRouteLoaderData, useSubmit } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
    const token = useRouteLoaderData('root');
    const loggedIn = token !== null;
    const submit = useSubmit();

    console.log(token);

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();
        //TODO add way to refresh token
        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);
    }, [token, submit]);

    return <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={0}
        direction="column"
        sx={{ background: '#636363' }}>
        <Header loggedIn={loggedIn} />
        <Outlet />
        <Footer />
    </Grid>
}

export default RootLayout;

