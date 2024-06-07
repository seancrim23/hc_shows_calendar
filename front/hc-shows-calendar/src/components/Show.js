function Show({ show }) {
    return (
        <>
            <p>{show.id}</p>
            <p>{show.location}</p>
            <p>{show.bands}</p>
        </>
    );
}

export default Show;