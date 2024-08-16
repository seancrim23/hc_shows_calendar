import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { redirect } from "react-router-dom";


function User({ user, isPromoter }) {

    //if there isn't a token, redirect
    if (!isPromoter) {
        redirect('/');
    }

    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {user.username}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {user.email}
                    </Typography>
                    {isPromoter && <div>
                    <p>update user info</p>
                    <p>reset password</p>
                    </div>}
                </CardContent>
            </Card>
        </>
    )
}

export default User;