import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hardcore Shows Calendar
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Subscribe</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Header;