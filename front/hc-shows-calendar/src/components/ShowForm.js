import React from 'react'
import { json, redirect } from 'react-router-dom';
import { Formik, FieldArray, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function ShowForm() {
    return (
        <Card sx={{marginTop:1.5, marginBottom:1.5}}>
            <Box sx={{marginLeft: 1.5, marginBottom: 1.5, marginTop:1.5}}>
                <Typography variant='h4' sx={{textAlign:'center'}}>Create a Show</Typography>
                <Divider sx={{marginTop:1.5, marginBottom:1.5}} />
                <Formik
                    initialValues={{
                        date: dayjs(),
                        time: dayjs(),
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
                            <h3>Date</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        id="date"
                                        name="date"
                                        label="Date"
                                        value={props.values.date}
                                        onChange={(value) => props.setFieldValue("date", value, true)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <h3>Time</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        id="time"
                                        name="time"
                                        label="Time"
                                        value={props.values.time}
                                        onChange={(value) => props.setFieldValue("time", value, true)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <h3>Venue</h3>
                            <TextField
                                id="venue"
                                name="venue"
                                label="Venue"
                                value={props.values.venue}
                                onChange={props.handleChange}
                            />

                            <h3>Address</h3>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                value={props.values.address}
                                onChange={props.handleChange}
                            />

                            <h3>State</h3>
                            <TextField
                                id="state"
                                name="state"
                                label="State"
                                value={props.values.state}
                                onChange={props.handleChange}
                            />

                            <h3>City</h3>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                value={props.values.city}
                                onChange={props.handleChange}
                            />

                            <h3>Lineup</h3>
                            <FieldArray
                                id="lineup"
                                name="lineup"
                                render={arrayHelpers => (
                                    <div>
                                        {props.values.lineup.map((band, index) => (
                                            <div key={index}>
                                                <TextField sx={{marginBottom:1}} name={`lineup.${index}`} value={band} onChange={props.handleChange} />
                                                <Button
                                                    sx={{marginLeft:1}}
                                                    type="button"
                                                    color="secondary"
                                                    variant="outlined"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    X
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outlined" onClick={() => arrayHelpers.push('')}>
                                            Add a band
                                        </Button>
                                    </div>
                                )}
                            />
                            <Divider sx={{marginTop:1.5, marginBottom:1.5}} />
                            <Button type="submit" color="primary" variant="contained">Create Show</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Card >
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
