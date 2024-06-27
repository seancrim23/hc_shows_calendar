import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import hc_shows_calendar_logo from "../assets/hardcore_shows_calendar.png";
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
/*
TODO:
implement login and subscribe
*/
function Header() {
  return (
    <Grid item xs={12}>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <AppBar position="static" sx={{ background: 'white', width: 700 }}>
          <a href='/'>
            <Box sx={{ textAlign: 'center' }}>
              <img src={hc_shows_calendar_logo} alt="logo" height={200} width={500} />
            </Box>
          </a>
          <Breadcrumbs sx={{
            "& ol": {
              justifyContent: "center",
              margin: "auto"
            },
            marginTop: 0.5,
            marginBottom: 1,
          }} >
            <Link color="inherit" underline="hover">Login</Link>
          </Breadcrumbs>
        </AppBar>
      </Box>
    </Grid>
  );
}

export default Header;