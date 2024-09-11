import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSubmit } from "react-router-dom";

function Show({ show, canEdit }) {
    const submit = useSubmit();

    function startDeleteHandler(id) {
        console.log(id)
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit({ showId: id }, { method: 'DELETE' })
        }
    }

    return (
        <>
            <Card sx={{ display: 'flex', marginTop:'10px', marginBottom:'10px', height:'100px', width:'600px' }}>
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
                    {canEdit &&
                        <menu>
                            <Button underline="none" component="button" color="inherit" href={`/shows/${show.id}/edit`}>Edit</Button>
                            <Button underline="none" component="button" color="inherit" onClick={() => startDeleteHandler(show.id)}>Delete</Button>
                        </menu>}
                </CardContent>
            </Card>
        </>
    );
}

export default Show;