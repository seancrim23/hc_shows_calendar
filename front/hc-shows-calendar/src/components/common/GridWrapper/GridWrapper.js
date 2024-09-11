import React from 'react'
import Grid from '@mui/material/Grid';
import { gridWrapperStyles } from './styles';

const GridWrapper = ({ children, size }) => {

    console.log(children)

    return (
        <Grid item size={size} sx={gridWrapperStyles}>
            {children}
        </Grid>
    )
}

export default GridWrapper