import React from 'react'
import Grid from '@mui/material/Grid';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ children }) => {

    console.log(children)

    return (
        <Grid container item xs={12} sx={{ 
            flexGrow: 1,
            display: 'flex',
            direction:'column',
            justifyContent:'flex-start',
            alignItems: 'center',
            padding: '48px 32px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#eaeff1',
         }}>
            {children}
        </Grid>
    )
}

export default GridWrapper