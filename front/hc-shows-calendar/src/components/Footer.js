import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

//TODO make footer look more cool
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