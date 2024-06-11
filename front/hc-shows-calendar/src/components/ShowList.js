import Show from './Show';

function ShowList({ shows }) {
    return (
        <>
            {(shows.length === 0) ? <p>No shows at the moment! Choose filters to find shows near you!</p> : shows.map((show) => (
                <Show key={show.id} show={show} />
            ))}
        </>
    )
}

export default ShowList;