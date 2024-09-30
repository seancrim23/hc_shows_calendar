//password reset - password / confirm password / auth code
import { useActionData, useNavigation, Form, json, redirect, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { REQUIRED_FIELD } from "../util/Constants";
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function AuthResetForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const validateSchema = Yup.object().shape({
    email: Yup.string().required(REQUIRED_FIELD),
    //TODO expand password validation
    password: Yup.string().required(REQUIRED_FIELD)
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string().required(REQUIRED_FIELD)
      .oneOf([Yup.ref('password'), null], 'password and confirm should match'),
    code: Yup.string().required(REQUIRED_FIELD),
  })

  var actionButtons = (
    <div>
      <Button variant="outlined" type="submit" sx={{ width: '100%', marginBottom: '5px' }} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Reset Password'}
      </Button>
    </div>
  );

  //TODO need to figure out how to get the user id to the reset password action
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        submit(values, { method: "PUT" })
      }}>
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <Box sx={{ paddingBottom: '10px' }}>

            {data && data.errors && <ul>
              {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
            </ul>}
            <Typography variant="h6">Email</Typography>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={props.values.email}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.email && props.errors.email ? (
              <div>{props.errors.email}</div>
            ) : null}
            <Typography variant="h6">Password</Typography>
            <TextField
              id="password"
              name="password"
              label="Password"
              value={props.values.password}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.password && props.errors.password ? (
              <div>{props.errors.password}</div>
            ) : null}
            <Typography variant="h6">Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={props.values.confirmPassword}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.confirmPassword && props.errors.confirmPassword ? (
              <div>{props.errors.confirmPassword}</div>
            ) : null}
            <Typography variant="h6">Code</Typography>
            <TextField
              id="code"
              name="code"
              label="Code"
              value={props.values.code}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.code && props.errors.code ? (
              <div>{props.errors.code}</div>
            ) : null}
          </Box>
          {actionButtons}
        </Form>
      )}
    </Formik>
  );

}

export default AuthResetForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const resetData = {
    email: data.get('email'),
    password: data.get('password'),
    code: data.get('code'),
  };

  //TODO these need to be updated to build the url differently based on env
  //+ ":" + process.env.REACT_APP_BACK_PORT
  let url = process.env.REACT_APP_BACK_URL + '/user/reset';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Reset failed!' }, { status: 500 });
  }

  return redirect('/');
}