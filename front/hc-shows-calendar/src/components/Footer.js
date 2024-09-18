import { Button, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/*
            <Grid item xs={12}>
                <Paper elevation={0} sx={{ position: 'relative', left: '0', bottom: '0', textAlign: 'center', paddingBottom: '5px' }}>
                    <Divider sx={{ width: { xs: '70%', sm: '70%', md: '60%', lg: '40%', xl: '40%' }, marginLeft: 'auto', marginRight: 'auto' }} />
                </Paper>
            </Grid>

                    <>
            <Container maxWidth="lg">
                <Box component="footer" sx={{ width: 'auto', position: 'fixed', bottom: 0, bgcolor: 'background.paper', py: 2, px: 2, mt: 'auto' }}>
                    <Button underline="hover" color="inherit" component="button" href="mailto:sean.g.crim@gmail.com" sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '.8rem', lg: '.9rem', xl: '1rem' } }}>Contact Me</Button>
                </Box>
            </Container>
        </>
*/

function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "white",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Button underline="hover" color="inherit" component="button" href="mailto:sean.g.crim@gmail.com" sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '.8rem', lg: '.9rem', xl: '1rem' } }}>Contact Me</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;