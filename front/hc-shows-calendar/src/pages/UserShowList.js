import ShowList from "../components/ShowList";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";
import GridWrapper from "../components/common/GridWrapper/GridWrapper";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function UserShowListPage() {
    const { showList } = useRouteLoaderData("user-show-list");
    const token = useRouteLoaderData('root');

    const isPromoter = token !== null;

    //TODO separate shows into upcoming and past
    //TODO show upcoming and past are in closed section
    return (
        <GridWrapper>
            <Grid container item xs={12} sx={{
                flexGrow: 1,
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '10px'
            }}>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Typography variant="h4" sx={{
                        paddingTop: '10px',
                        }}>User Show List</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Button sx={{
                        marginTop:'13px',
                        width:'100%'
                    }} variant="outlined" component="button" color="inherit" href={`/shows/new`}>Create New Show</Button>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{
                flexGrow: 1,
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                height: 'auto',
                maxHeight:'700px',
                overflow:'hidden',
                overflowY:'scroll'
            }}>
                <Grid item xs={12}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await resolve={showList}>
                            {loadedShowList => <ShowList shows={loadedShowList} noShowsMessage={"You haven't created any shows yet... add a show."} isPromoter={isPromoter} />}
                        </Await>
                    </Suspense>
                </Grid>
            </Grid>
        </GridWrapper>
    )
}

export default UserShowListPage;

async function loadUserShowList() {
    const token = getAuthToken();
    const url = process.env.REACT_APP_BACK_URL + "/user/shows"
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw json({ message: "could not find shows for the user." }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return defer({
        showList: await loadUserShowList()
    });
}