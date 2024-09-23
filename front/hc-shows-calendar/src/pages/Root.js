import { Outlet, useRouteLoaderData, useSubmit } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';

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

    return (
        <Box sx={{ background: '#636363', height:'100vh', backgroundSize: 'auto auto' }}>
            <Container maxWidth="lg">
                <Header loggedIn={loggedIn} />
                <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={0}
                    direction="column"
                    display="flex">
                    <Outlet />
                </Grid>
                <Footer />
            </Container>

        </Box>
    );
}

export default RootLayout;

