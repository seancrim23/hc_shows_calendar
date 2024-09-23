import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { redirect } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function User({ user, isPromoter }) {

    //if there isn't a token, redirect
    if (!isPromoter) {
        redirect('/');
    }

    //TODO add edit user
    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Box sx={{paddingBottom: '10px'}}>
                        <Typography component="h2" variant="h5">
                            {"Username: " + user.username}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            {"Email: " + user.email}
                        </Typography>
                    </Box>
                    {isPromoter && <div>
                        <Button variant="outlined" color="inherit" href={`/reset`}>Reset Password</Button>
                    </div>}
                </CardContent>
            </Card>
        </>
    )
}

export default User;