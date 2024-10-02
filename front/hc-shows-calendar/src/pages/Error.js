import { useRouteError, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import hc_shows_calendar_bg from "../assets/hc_shows_calendar_yot_small.png";
import { Link, Typography } from "@mui/material";

//TODO add more error handling / clean this up
//i think the error parsing needs to get fixed bc it doesnt like JSON parse error.data...
function ErrorPage() {
    const error = useRouteError();
    const token = useRouteLoaderData('root');
    const loggedIn = token !== null;

    let title = "An error occurred!";
    let message = "Something went wrong!";

    console.log(error)
    console.log(error.data)
    console.log(error.status)

    if (error.status === 500) {
        console.log("error: " + error.data.message)
        message = error.data.message
        //message = JSON.parse(error.data).message;
    }

    if (error.status === 400) {
        console.log("error: " + error.data.message)
        message = error.data.message
        //message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        title = "not found!";
        message = "could not find resource or page";
    }

    /*
    return (
        <Box sx={{ backgroundImage: `url(${hc_shows_calendar_bg})`, display:'flex', flexDirection:'column', minHeight:'100vh'}}>
            <Container sx={{flexGrow:1}} maxWidth="lg">
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
    */

    return (
        <Box sx={{ backgroundImage: `url(${hc_shows_calendar_bg})`, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container sx={{ flexGrow: 1 }} maxWidth="lg">
                <Header loggedIn={loggedIn} />
                <Grid
                    container
                    alignItems="center"
                    backgroundColor='#f5f5f5'
                    justifyContent="flex-start"
                    borderBottom='1px solid rgba(0, 0, 0, 0.12)'
                    paddingLeft='20px'
                    paddingRight='20px'
                    paddingBottom='10px'
                    spacing={0}
                    direction="column"
                    display="flex">
                    <PageContent title={title}>
                        <Typography variant='subtitle1'>{message}</Typography>
                        <Typography>Back to <Link href="/">HOME</Link></Typography>
                    </PageContent>
                </Grid>
                <Footer />
            </Container>
        </Box>
    );
}

export default ErrorPage;