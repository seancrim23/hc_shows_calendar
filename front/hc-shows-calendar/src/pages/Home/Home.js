import { useState } from "react";
import ShowList from "../../components/ShowList"
import ShowFilters from "../../components/ShowFilters";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function HomePage() {
    const [showList, setShowList] = useState([]);
    const [hasError, setHasError] = useState(false);

    return (
        <GridWrapper>
            <Grid container item xs={12} sx={{
                flexGrow: 1,
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '10px'
            }}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{
                        paddingTop: { xs: '4px', sm: '6px', md: '6px', lg: '6px', xl: '8px' },
                        paddingBottom: '5px',
                        fontSize: { xs: 12, sm: 18, md: 18, lg: 18, xl: 20 }
                    }}>Choose a state and city to find shows in for the upcoming week...</Typography>
                </Grid>
                <ShowFilters setShowList={setShowList} setHasError={setHasError} />
            </Grid>
            <Grid container item xs={12} sx={{
                flexGrow: 1,
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                height: 'auto',
                maxHeight:'700px',
                overflow:'hidden',
                overflowY:'scroll'
            }}>
                {hasError ? <Grid item xs={12}><Typography variant="h6">Error retrieving shows, please try filtering again. (Contact me if error continues)</Typography></Grid> :
                    <ShowList shows={showList} hasError={hasError} isPromoter={false} noShowsMessage={"No shows at the moment! Choose filters to find shows near you!"} />
                }
            </Grid>
        </GridWrapper>
    )
}

export default HomePage;