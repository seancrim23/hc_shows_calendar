import Show from "./Show";

//should this component be separate from the search?
//is it better to load options from a db? or store as a json and read based on that?
//when you pick a state, load all possible cities (dont have to pick one)
//imo should just change based on filters, shouldnt have to even click search
//just pick your desired filters and shows for a week(?) should immediately pop up
function ShowList() {
    return (
        <>
            <div>
                <Show />
                <Show />
                <Show />
            </div>
        </>
    )
}

export default ShowList;