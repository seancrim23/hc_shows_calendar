import { useState } from "react";
import ShowList from "../components/ShowList"
import ShowFilters from "../components/ShowFilters";

function HomePage() {
    const [showList, setShowList] = useState([]);
    const [hasError, setHasError] = useState(false);

    return (
        <>
            <ShowFilters setShowList={setShowList} setHasError={setHasError} />
            {hasError ? <p>Error retrieving shows, please try filtering again (idk if it still doesnt work contact me?)</p> :
                <ShowList shows={showList} hasError={hasError} />
            }
        </>
    )
}

export default HomePage;