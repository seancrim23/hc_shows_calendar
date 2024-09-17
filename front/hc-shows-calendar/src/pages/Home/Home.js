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
    const [stateSelected, setStateSelected] = useState('');

    var filterContainerHeight = '110px';
    if (stateSelected !== '') {
        filterContainerHeight = '250px';
    }

    return (
        <GridWrapper size={12}>
            <Box sx={{
                display: 'static',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingRight: '20px',
                height: { xs: { filterContainerHeight }, sm: { filterContainerHeight }, md: '130px', lg: '110px', xl: '110px' },
                width: { xs: '85%', sm: '94%', md: '94%', lg: '94%', xl: '94%' },
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
                <Grid container>
                    <Grid size={12}>
                        <Typography variant="h6" sx={{
                            paddingTop: { xs: '4px', sm: '6px', md: '6px', lg: '6px', xl: '8px' },
                            fontSize: { xs: 12, sm: 18, md: 18, lg: 18, xl: 20 }
                        }}>Choose a state and city to find shows in...</Typography>
                        <ShowFilters setStateSelected={setStateSelected} setShowList={setShowList} setHasError={setHasError} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                display: 'static',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingRight: '20px',
                height: 'auto',
                width: { xs: '85%', sm: '94%', md: '94%', lg: '94%', xl: '94%' },
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
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