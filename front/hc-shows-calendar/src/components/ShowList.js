import Show from './Show';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ShowList({ shows, noShowsMessage, isPromoter }) {
    //protect from null case
    if (shows === null) {
        shows = [];
    }

    return (
        <>
            {(shows.length === 0) ? <Grid item xs={12} sx={{padding: '5px'}}><Typography variant="subtitle1">{noShowsMessage}</Typography></Grid> : shows.map((show) => (
                <Grid item key={show.id} xs={12}><Show key={show.id} show={show} canEdit={isPromoter} /></Grid>
            ))}
        </>
    )
}

export default ShowList;