import { useRouteError, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';

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

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={0}
            direction="column"
            sx={{ background: '#636363' }}>
            <Header loggedIn={loggedIn} />
            <PageContent title={title}>
                <p>{message}</p>
                <p>Back to <a href="/">HOME</a></p>
            </PageContent>
            <Footer />
        </Grid>

    );
}

export default ErrorPage;