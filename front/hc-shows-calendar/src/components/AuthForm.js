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
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <p>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
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
    pass: data.get('password'),
  };

  //TODO these need to be updated to build the url differently based on env
  //+ ":" + process.env.REACT_APP_BACK_PORT
  let url = process.env.REACT_APP_BACK_URL + '/auth';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Login failed!' }, { status: 500 });
  }

  const resData = await response.json();
  console.log(resData);
  const token = resData.token;

  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}