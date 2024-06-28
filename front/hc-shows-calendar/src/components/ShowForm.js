import React from 'react'
import { json, redirect, useSubmit } from 'react-router-dom';
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
import * as Yup from 'yup';
import { REQUIRED_FIELD } from '../util/Constants';
import statesMapping from '../assets/StatesMapping.json';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


//add validation
function ShowForm({ method, show }) {
    const submit = useSubmit();
    const showSubmitMethod = method === 'PUT' ? 'Edit' : 'Create';

    const validateSchema = Yup.object().shape({
        venue: Yup.string().required(REQUIRED_FIELD),
        address: Yup.string().required(REQUIRED_FIELD),
        state: Yup.string().required(REQUIRED_FIELD),
        city: Yup.string().required(REQUIRED_FIELD),
    })

    return (
        <Card sx={{ marginTop: 1.5, marginBottom: 1.5 }}>
            <Box sx={{ marginLeft: 1.5, marginBottom: 1.5, marginTop: 1.5 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>{showSubmitMethod} a Show</Typography>
                <Divider sx={{ marginTop: 1.5, marginBottom: 1.5 }} />
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
                    validationSchema={validateSchema}
                    onSubmit={async (values) => {
                        submit(values, { method: method });
                    }}>
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
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                            />
                            {props.touched.venue && props.errors.venue ? (
                                <div>{props.errors.venue}</div>
                            ) : null}

                            <h3>Address</h3>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                value={props.values.address}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                            />
                            {props.touched.address && props.errors.address ? (
                                <div>{props.errors.address}</div>
                            ) : null}

                            <h3>State</h3>
                            <Select
                                id="state"
                                name="state"
                                label="State"
                                value={props.values.state}
                                onChange={props.handleChange}
                            >
                                {
                                    Object.keys(statesMapping).map((key, i) => (
                                        <MenuItem key={i} value={key}>{key}</MenuItem>
                                    ))
                                }
                            </Select>
                            {props.touched.state && props.errors.state ? (
                                <div>{props.errors.state}</div>
                            ) : null}

                            <h3>City</h3>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                value={props.values.city}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                            />
                            {props.touched.city && props.errors.city ? (
                                <div>{props.errors.city}</div>
                            ) : null}

                            <h3>Lineup</h3>
                            <FieldArray
                                id="lineup"
                                name="lineup"
                                render={arrayHelpers => (
                                    <div>
                                        {props.values.lineup.map((band, index) => (
                                            <div key={index}>
                                                <TextField sx={{ marginBottom: 1 }} name={`lineup.${index}`} onBlur={props.handleBlur} value={band} onChange={props.handleChange} />
                                                <Button
                                                    sx={{ marginLeft: 1 }}
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
                            <Divider sx={{ marginTop: 1.5, marginBottom: 1.5 }} />
                            <Button type="submit" color="primary" variant="contained">Create Show</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Card >
    );
}

export default ShowForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    console.log(Object.fromEntries(data));

    /*const currentDate = new Date();

    const showData = {
        title: data.get('title'),
        content: data.get('content'),
        date: currentDate
    };

    let url = process.env.REACT_APP_BACK_URL + '/show';

    if (method === 'PUT') {
        console.log("updating blog post...")
        const showId = params.id;
        url = url + '/' + showId;
    }

    const token = getAuthToken();

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(showData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save show!' }, { status: 500 });
    }*/

    return redirect('/');
}
