import React from 'react'
import { json, redirect } from 'react-router-dom';
import { Formik, FieldArray, Field, Form } from 'formik';
import { DatePickerField } from './common/DatePickerField/DatePickerField';
import { TimePickerField } from './common/TimePickerField/TimePickerField';
import TimePicker from 'react-time-picker';

function ShowForm() {
    return (
        <div>
            <Formik
                initialValues={{
                    date: '',
                    time: '',
                    venue: '',
                    address: '',
                    state: '',
                    city: '',
                    lineup: [],
                }}
                onSubmit={(values) => {
                    console.log(JSON.stringify(values));
                }} >
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <label htmlFor="date">Date</label>
                        <DatePickerField
                            id="date"
                            name="date"
                        />

                        <label htmlFor="time">Time</label>
                        {/*<Field name="time">
                            {({ field }) => {
                                return (
                                    <TimePicker
                                        ampm={false}
                                        format="HH:mm"
                                        slotProps={{
                                            textField: {
                                                label: "Showtime", size: "small", fullWidth: true,
                                            },
                                        }}
                                        {...field}
                                        onChange={(value) => console.log(value)}
                                    />
                                )
                            }}
                        </Field>*/}
                        <Field 
                            component={TimePicker}
                            name="time"
                            label="Time"
                            ampm={false}
                            openTo="hours"
                            views={['hours', 'minutes', 'seconds']}
                            format="HH:mm"
                        />

                        <label htmlFor="venue">Venue</label>
                        <input
                            id="venue"
                            name="venue"
                            onChange={props.handleChange}
                            value={props.values.venue}
                        />

                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            name="address"
                            onChange={props.handleChange}
                            value={props.values.address}
                        />

                        <label htmlFor="state">State</label>
                        <input
                            id="state"
                            name="state"
                            onChange={props.handleChange}
                            value={props.values.state}
                        />

                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            onChange={props.handleChange}
                            value={props.values.city}
                        />

                        <label htmlFor="lineup">Lineup</label>
                        <FieldArray
                            id="lineup"
                            name="lineup"
                            render={arrayHelpers => (
                                <div>
                                    {props.values.lineup && props.values.lineup.length > 0 ? (
                                        props.values.lineup.map((band, index) => (
                                            <div key={index}>
                                                <Field name={`lineup.${index}`} />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.insert(index, '')}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            Add a band
                                        </button>
                                    )}
                                </div>
                            )}
                        />


                        <button type="submit">Create Show</button>
                    </Form>
                )}
            </Formik>
        </div >
    );
    /*const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            venue: '',
            address: '',
            state: '',
            city: '',
            lineup: [],
        },
        onSubmit: values => {
            console.log(JSON.stringify(values));
        },
    });*/

    /*return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="date">Date</label>
            <DatePickerField
                id="date"
                name="date"
            />

            <label htmlFor="time">Time</label>
            <TimePicker
                id="time"
                name="time"
                onChange={formik.handleChange}
                value={formik.values.time}
            />

            <label htmlFor="venue">Venue</label>
            <input
                id="venue"
                name="venue"
                onChange={formik.handleChange}
                value={formik.values.venue}
            />

            <label htmlFor="address">Address</label>
            <input
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
            />

            <label htmlFor="state">State</label>
            <input
                id="state"
                name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
            />

            <label htmlFor="city">City</label>
            <input
                id="city"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
            />

            <label htmlFor="lineup">lineup</label>
            <FieldArray
                id="lineup"
                name="lineup"
                render={arrayHelpers => (
                    <div>
                        {formik.values.lineup && formik.values.lineup > 0 ? (
                            formik.values.lineup.map((band, index) => (
                                <div key={index}>
                                    <Field name={`lineup.${index}`} />
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.insert(index, '')}
                                    >
                                        +
                                    </button>
                                </div>
                            ))
                        ) : (
                            <button type="button" onClick={() => arrayHelpers.push('')}>
                                Add a band
                            </button>
                        )}
                    </div>
                )}
            />


            <button type="submit">Create Show</button>
        </form>
    )*/


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
