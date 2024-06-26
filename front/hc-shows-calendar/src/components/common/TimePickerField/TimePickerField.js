import React from 'react'
import { useField, useFormikContext } from 'formik';
import TimePicker from 'react-time-picker';


export const TimePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <TimePicker
            {...field}
            {...props}
            format="HH:mm"
            onChange={(value) => {
                setFieldValue(field.name, value.format("hh:mm"));
            }}
        />
    )
}
