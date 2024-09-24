import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import hc_shows_calendar_logo from "../assets/hardcore_shows_calendar.png";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function Header({ loggedIn }) {
  var headeroptions = loggedIn ? [
    <Link key="profile" href="/user/profile" color="inherit" underline="hover">Profile</Link>,
    <Link key="user shows" href="/user/shows" color="inherit" underline="hover">Shows</Link>,
    <Link key="logout" href="/logout" color="inherit" underline="hover">Logout</Link>,
  ] : [
    <Link key="login" href="/login" color="inherit" underline="hover">Login</Link>,
  ]

  return (
        <AppBar position="static" sx={{ background: 'white' }}>
          <Link href='/' sx={{ justifyContent: 'center', margin: 'auto', marginTop: 0.5 }}>
            <Box component="img" sx={{
                            height: { xs: 75, sm: 200, md: 200, lg: 200, xl: 200 },
                            width: { xs: 210, sm: 500, md: 500, lg: 500, xl: 500 }
            }} src={hc_shows_calendar_logo} alt="hc shows calendar logo" />
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
  );
}

export default Header;