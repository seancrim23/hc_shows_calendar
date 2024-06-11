import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/*
TODO:
implement login and subscribe
*/
function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hardcore Shows Calendar
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Header;