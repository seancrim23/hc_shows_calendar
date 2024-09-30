//form to create a user, just has email username password and verification code for now
//probably can be built out in the future with more user stuff thats not very important right now
import { useActionData, useNavigation, json, redirect, useSubmit } from "react-router-dom";
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { REQUIRED_FIELD } from "../util/Constants";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function UserForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const validateSchema = Yup.object().shape({
    email: Yup.string().required(REQUIRED_FIELD),
    username: Yup.string().required(REQUIRED_FIELD),
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
        {isSubmitting ? 'Submitting...' : 'Create User'}
      </Button>
    </div>
  );

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        submit(values, { method: "POST" })
      }}>
      {props => (
        <Form method="POST">
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
              <Typography sx={{ color: '#FF0000' }} variant="subtitle2">{props.errors.email}</Typography>
            ) : null}
            <Typography variant="h6">Username</Typography>
            <TextField
              id="username"
              name="username"
              label="Username"
              value={props.values.username}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.username && props.errors.username ? (
              <Typography sx={{ color: '#FF0000' }} variant="subtitle2">{props.errors.username}</Typography>
            ) : null}
            <Typography variant="h6">Password</Typography>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={props.values.password}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.password && props.errors.password ? (
              <Typography sx={{ color: '#FF0000' }} variant="subtitle2">{props.errors.password}</Typography>
            ) : null}
            <Typography variant="h6">Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={props.values.confirmPassword}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              sx={{ width: '100%' }}
            />
            {props.touched.confirmPassword && props.errors.confirmPassword ? (
              <Typography sx={{ color: '#FF0000' }} variant="subtitle2">{props.errors.confirmPassword}</Typography>
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
              <Typography sx={{ color: '#FF0000' }} variant="subtitle2">{props.errors.code}</Typography>
            ) : null}
          </Box>
          {actionButtons}
        </Form>
      )}
    </Formik>
  )
}

export default UserForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const createUserData = {
    email: data.get('email'),
    username: data.get('username'),
    password: data.get('password'),
    code: data.get('code'),
  };

  //TODO these need to be updated to build the url differently based on env
  //+ ":" + process.env.REACT_APP_BACK_PORT
  let url = process.env.REACT_APP_BACK_URL + '/user';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createUserData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'User auth creation failed failed!' }, { status: 500 });
  }

  //redirect to user login
  return redirect('/');
}