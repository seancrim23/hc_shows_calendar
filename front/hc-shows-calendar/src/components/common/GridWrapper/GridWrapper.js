import React from 'react'
import Grid from '@mui/material/Grid';

const GridWrapper = ({ children }) => {
    return (
        <Grid container item direction="column" sx={{ 
            flexGrow: 1,
            display: 'flex',
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