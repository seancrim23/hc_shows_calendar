import React from 'react'
import { json, redirect } from 'react-router-dom';

function ShowForm() {
    return (
        <div>
            show form
        </div>
    )
}

export default ShowForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const currentDate = new Date();

    //modify for show info
    const showData = {
        title: data.get('title'),
        content: data.get('content'),
        date: currentDate
    };

    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    let url = process.env.REACT_APP_BACK_URL + '/show';

    if (method === 'PUT') {
        console.log("updating blog post...")
        const showId = params.id;
        url = url + '/' + showId;
    }

    //const token = getAuthToken();
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            /*'Authorization': 'Bearer ' + token*/
        },
        body: JSON.stringify(showData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save show!' }, { status: 500 });
    }

    return redirect('/show');
}
