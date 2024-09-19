import { useActionData, useNavigation, Form, json, redirect } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//TODO needs material UI
//maybe formik?
function AuthForm({ method }) {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  var actionButtons = (
    <div>
      <Button variant="outlined" sx={{ width: '100%', marginBottom: '5px'}} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Login'}
      </Button>
    </div>
  );

  return (
    <Form method={method}>
      <Box sx={{paddingBottom: '10px'}}>
      <Typography sx={{ textAlign: 'center', paddingTop: '10px' }} variant="h4" gutterBottom>Login</Typography>
      <InputLabel htmlFor="username">Username</InputLabel>
      <TextField id="username" type="text" name="username" sx={{width:'100%'}}  required />
      <InputLabel htmlFor="password">Password</InputLabel>
      <TextField id="password" type="password" name="password" sx={{width:'100%'}} required />
      </Box>
      {data && data.error && <div>{data.error}</div>}
      {actionButtons}
    </Form>
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