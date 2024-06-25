import Show from './Show';

function ShowList({ shows, noShowsMessage }) {
    return (
        <>
            {(shows.length === 0) ? <p>{noShowsMessage}</p> : shows.map((show) => (
                <Show key={show.id} show={show} />
            ))}
        </>
    )
}

export default ShowList;