import React from 'react'
import Grid from '@mui/material/Grid';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ children, size }) => {

    console.log(children)

    return (
        <Grid item size={size} sx={{ 
            position: 'static',
            padding: '48px 32px',
            minHeight: 'calc(100vh - 166px)',
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