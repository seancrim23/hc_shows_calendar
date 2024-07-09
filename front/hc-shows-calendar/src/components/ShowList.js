import Show from './Show';

function ShowList({ shows, noShowsMessage, isPromoter }) {
    return (
        <>
            {(shows.length === 0) ? <p>{noShowsMessage}</p> : shows.map((show) => (
                <Show key={show.id} show={show} canEdit={isPromoter} />
            ))}
        </>
    )
}

export default ShowList;