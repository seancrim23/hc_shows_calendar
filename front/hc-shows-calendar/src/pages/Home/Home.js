import { useState } from "react";
import ShowList from "../../components/ShowList"
import ShowFilters from "../../components/ShowFilters";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { showFilterStyles, showListStyles } from "./styles";

function HomePage() {
    const [showList, setShowList] = useState([]);
    const [hasError, setHasError] = useState(false);

    return (
        <GridWrapper size={12}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingRight: '20px',
                height: '110px',
                width: {xs: '85%', sm: '85%', lg:'94%', xl:'94%'},
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
                <Grid container>
                    <Grid size={12}>
                        <Typography variant="h6" sx={{ paddingTop: '8px', fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 20 } }}>Choose a state and city to find shows in...</Typography>
                        <ShowFilters sx={{ alignItems: 'center' }} setShowList={setShowList} setHasError={setHasError} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={showListStyles.wrapper}>
                <Grid container>
                    {hasError ? <Grid item size={12}><Typography variant="h6">Error retrieving shows, please try filtering again (idk if it still doesnt work contact me?)</Typography></Grid> :
                        <Grid size={12}><ShowList shows={showList} hasError={hasError} isPromoter={false} noShowsMessage={"No shows at the moment! Choose filters to find shows near you!"} /></Grid>
                    }
                </Grid>
            </Box>
        </GridWrapper>
    )
}

export default HomePage;