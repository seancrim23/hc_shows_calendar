import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSubmit } from "react-router-dom";
import { format } from 'date-fns';
import Box from "@mui/material/Box";

function Show({ show, canEdit }) {
    const submit = useSubmit();

    function startDeleteHandler(id) {
        //TODO build out modal or something
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit({ showId: id }, { method: 'DELETE' })
        }
    }

    return (
        <>
            <Card sx={{ 
                display: 'flex',
                margin: '8px'}}>
                <CardContent>
                    <Typography variant="h6">
                        {format(show.date, 'Pp')}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {show.lineup.join(" / ")}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {show.venue + " - " + show.city + ", " + show.state}
                    </Typography>
                    {canEdit &&
                        <Box sx={{
                            paddingTop:'5px'
                        }}>
                            <Button variant="outlined" color="inherit" sx={{marginRight:'3px'}} href={`/shows/${show.id}/edit`}>Edit</Button>
                            <Button variant="outlined" color="inherit" onClick={() => startDeleteHandler(show.id)}>Delete</Button>
                        </Box>}
                </CardContent>
            </Card>
        </>
    );
}

export default Show;