import React from 'react'
import Grid from '@mui/material/Grid';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ children }) => {

    console.log(children)

    return (
        <Grid container item sx={{ 
            flexGrow: 1,
            display: 'flex',
            direction:'column',
            justifyContent:'flex-start',
            alignItems: 'center',
            padding: '48px 32px',
            marginTop: '10px',
            marginBottom: '10px',
            width: {xs: '85%', s: '63%', md: '58%', lg:'55%', xl: '40%'},
            backgroundColor: '#eaeff1',
         }}>
            {children}
        </Grid>
    )
}

export default GridWrapper