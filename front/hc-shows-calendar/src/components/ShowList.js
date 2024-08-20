import Show from './Show';

function ShowList({ shows, noShowsMessage, isPromoter }) {
    //protect from null case
    if (shows === null) {
        shows = [];
    }

    return (
        <>
            {(shows.length === 0) ? <p>{noShowsMessage}</p> : shows.map((show) => (
                <Show key={show.id} show={show} canEdit={isPromoter} />
            ))}
        </>
    )
}

export default ShowList;