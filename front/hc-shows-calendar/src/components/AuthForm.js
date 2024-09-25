import { useActionData, useNavigation, json, redirect, useSubmit } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { REQUIRED_FIELD } from "../util/Constants";

//TODO needs material UI
//maybe formik?
function AuthForm({ method }) {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const validateSchema = Yup.object().shape({
    username: Yup.string().required(REQUIRED_FIELD),
    //TODO expand password validation
    password: Yup.string().required(REQUIRED_FIELD),
  })

  var actionButtons = (
    <div>
      <Button variant="outlined" type="submit" sx={{ width: '100%', marginBottom: '5px' }} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Login'}
      </Button>
    </div>
  );

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        submit(values, { method: method })
      }}>
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <Box sx={{ paddingBottom: '10px' }}>
            <Typography sx={{ textAlign: 'center',
               paddingTop: '10px',
               fontSize:{xs:'26px', sm:'26px', md:'34px', lg:'34px', xl:'34px'} }} variant="h4" gutterBottom>Login</Typography>
            <TextField
              id="username"
              label="Username"
              type="text"
              name="username"
              value={props.values.username}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }} />
            <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              value={props.values.password}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }} />
          </Box>
          {data && data.error && <div>{data.error}</div>}
          {actionButtons}
        </Form>
      )}
    </Formik>
  );

}

export default AuthForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  let url = process.env.REACT_APP_BACK_URL + '/auth';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData),
  });

  switch (response.status) {
    case 400:
      //log out specific error
      return json({ error: "login failed. " });
    case 401:
      //unauthorized
      return json({ error: "login failed." });
    case 404:
      //cant find user
      return json({ error: "login failed." });
    case 500:
      throw json({ message: 'An error occurred. Please try again and contact us if the error continues. Thank you!' }, { status: 500 });
    default:
    //do something
  }

  if (!response.ok) {
    throw json({ message: 'An error occurred. Please try again and contact us if the error continues. Thank you!' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}