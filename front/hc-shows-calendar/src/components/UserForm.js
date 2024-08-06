//form to create a user, just has email username password and verification code for now
//probably can be built out in the future with more user stuff thats not very important right now
import { useActionData, useNavigation, Form, json, redirect } from "react-router-dom";

function UserForm() {
    const data = useActionData();
    const navigation = useNavigation();
  
    const isSubmitting = navigation.state === "submitting";
  
    var actionButtons = (
      <div>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create User'}
        </button>
      </div>
    );

    return (
        <Form method="POST">
        {data && data.errors && <ul>
          {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" required />
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
    )}

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