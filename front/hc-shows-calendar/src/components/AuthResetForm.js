//password reset - password / confirm password / auth code
import { useActionData, useNavigation, Form, json, redirect } from "react-router-dom";

function AuthResetForm() {
    const data = useActionData();
    const navigation = useNavigation();
  
    const isSubmitting = navigation.state === "submitting";
  
    var actionButtons = (
      <div>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Reset Password'}
        </button>
      </div>
    );

    //TODO need to figure out how to get the user id to the reset password action
    return (
        <Form method="PUT">
        {data && data.errors && <ul>
          {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" name="confirmPassword" required />
        </p>
        <p>
          <label htmlFor="code">Code</label>
          <input id="code" name="code" required />
        </p>
        {actionButtons}
      </Form>
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