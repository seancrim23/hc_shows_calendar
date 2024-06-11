import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Show({ show }) {
    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {show.date}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {show.lineup.join(", ")}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {show.venue}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {show.city + ", " + show.state}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default Show;