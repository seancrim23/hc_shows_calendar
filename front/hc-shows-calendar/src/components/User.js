import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


function User({ user }) {
    //user should be able to see their profile and change info if necessary
    //also should be able to reset password if they want to
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
                    <p>update user info</p>
                    <p>reset password</p>
                </CardContent>
            </Card>
        </>
    )
}

export default User;