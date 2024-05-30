import { Button, Paper, Divider } from '@mui/material';

function Footer() {
    return (
        <>
            <Paper elevation={0} sx={{position: 'relative', left: '0', bottom: '0', textAlign: 'center', paddingBottom: '5px'}}>
                <Divider sx={{width: {xs: '70%', sm: '70%', md: '60%', lg: '40%', xl: '40%'}, marginLeft: 'auto', marginRight: 'auto'}}/>
                <Button underline="hover" color="inherit" component="button" href="mailto:sean.g.crim@gmail.com" sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '.8rem', lg: '.9rem', xl: '1rem'}}}>Contact Me</Button>
            </Paper>
        </>
    );
}

export default Footer;