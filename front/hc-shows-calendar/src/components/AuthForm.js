import { useActionData, useNavigation, Form, json, redirect } from "react-router-dom";

//TODO needs material UI
//maybe formik?
function AuthForm({ method }) {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  var actionButtons = (
    <div>
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Login'}
      </button>
    </div>
  );

  return (
    <Form method={method}>
      <p>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
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