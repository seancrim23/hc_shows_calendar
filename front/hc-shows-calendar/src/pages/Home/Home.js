import { useState } from "react";
import ShowList from "../../components/ShowList"
import ShowFilters from "../../components/ShowFilters";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { showFilterStyles, showListStyles } from "./styles";

function HomePage() {
    const [showList, setShowList] = useState([]);
    const [hasError, setHasError] = useState(false);

    return (
        <GridWrapper>
            <Box sx={showFilterStyles.wrapper}>
                <Typography>Choose a state and city to find shows in...</Typography>
                <ShowFilters setShowList={setShowList} setHasError={setHasError} />
            </Box>
            <Box sx={showListStyles.wrapper}>
                {hasError ? <p>Error retrieving shows, please try filtering again (idk if it still doesnt work contact me?)</p> :
                    <ShowList shows={showList} hasError={hasError} noShowsMessage={"No shows at the moment! Choose filters to find shows near you!"} />
                }
            </Box>
        </GridWrapper>
    )
}

export default HomePage;