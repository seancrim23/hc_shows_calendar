import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { redirect, useRouteLoaderData } from "react-router-dom";


function User({ user }) {
    const token = useRouteLoaderData('root');
    //user should be able to see their profile and change info if necessary
    //also should be able to reset password if they want to

    //if there isn't a token, redirect
    if (token === "") {
        redirect('/')
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
                    {token && <div>
                    <p>update user info</p>
                    <p>reset password</p>
                    </div>}
                </CardContent>
            </Card>
        </>
    )
}

export default User;