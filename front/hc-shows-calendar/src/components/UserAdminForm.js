//form for admins to create users - really only need an email field
//needs to be token protected
import { useActionData, useNavigation, json, redirect, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { REQUIRED_FIELD } from "../util/Constants";
import Input from "@mui/material/Input";
import { getAuthToken } from '../util/auth';

function UserAdminForm({ type }) {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const validateSchema = Yup.object().shape({
    email: Yup.string().required(REQUIRED_FIELD),
  })

  var actionButtons = (
    <div>
      <Button variant="outlined" type="submit" color="primary" sx={{ width: '100%', marginBottom: '5px' }} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : (type === 'setup' ? 'Create User' : 'Reset Password')}
      </Button>
    </div>
  );

  return (
    <Formik
      initialValues={{
        email: '',
        type: type,
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        submit(values, { method: "POST" });
      }}>
      {props => (
        <Form onSubmit={props.handleSubmit}>
          {data && data.errors && <ul>
            {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
          </ul>}
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"
            value={props.values.email}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            sx={{
              width: '100%',
              paddingBottom: '10px'
            }}
          />
          <Input type="hidden" name="type" id="type" value={props.values.email} />
          {actionButtons}
        </Form>
      )}
    </Formik>
  )
}

export default UserAdminForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const createUserAuthData = {
    email: data.get('email'),
  };

  const type = data.get('type');

  let url = process.env.REACT_APP_BACK_URL + '/auth/' + type;

  const token = getAuthToken();

  var headers = {
    'Content-Type': 'application/json',
  }
  if (token !== null && token !== 'EXPIRED') {
    headers.Authorization = 'Bearer ' + token
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(createUserAuthData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'User auth creation failed failed!' }, { status: 500 });
  }

  return redirect('/');
}
