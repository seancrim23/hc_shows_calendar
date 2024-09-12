import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import hc_shows_calendar_logo from "../assets/hardcore_shows_calendar.png";
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function Header({ loggedIn }) {
  var headeroptions = loggedIn ? [
    <Link href="/user/profile" color="inherit" underline="hover">Profile</Link>,
    <Link href="/user/shows" color="inherit" underline="hover">Shows</Link>,
    <Link href="/logout" color="inherit" underline="hover">Logout</Link>,
  ] : [
    <Link href="/login" color="inherit" underline="hover">Login</Link>,
  ]

  return (
    <Grid item xs={12}>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <AppBar position="static" sx={{ background: 'white', width:{xs: 300, sm: 600, md: 600, lg: 700, xl:700} }}>
          <Link href='/' sx={{justifyContent: 'center', margin:'auto', marginTop: 0.5}}>
            <Box component="img" sx={{ height: {xs: 75, sm: 100, md: 150, lg: 200, xl: 200}, width: {xs: 210, sm: 300, md: 400, lg: 500, xl: 500} }} src={hc_shows_calendar_logo} alt="hc shows calendar logo" />
          </Link>
          <Breadcrumbs sx={{
            "& ol": {
              justifyContent: "center",
              margin: "auto"
            },
            marginTop: 0.5,
            marginBottom: 1,
          }} >
            {headeroptions}
          </Breadcrumbs>
        </AppBar>
      </Box>
    </Grid>
  );
}

export default Header;