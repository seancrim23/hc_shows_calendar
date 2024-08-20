//form for admins to create users - really only need an email field
//needs to be token protected
import { useActionData, useNavigation, Form, json, redirect } from "react-router-dom";

function UserAdminForm({ type }) {
    const data = useActionData();
    const navigation = useNavigation();
  
    const isSubmitting = navigation.state === "submitting";
  
    var actionButtons = (
      <div>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : (type === 'setup' ? 'Create User' : 'Reset Password')}
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
        <input type="hidden" name="type" id="type" value={type} />
        {actionButtons}
      </Form>
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
    console.log(type);
  
    //TODO these need to be updated to build the url differently based on env
    //+ ":" + process.env.REACT_APP_BACK_PORT
    //somehow get the type out of here
    let url = process.env.REACT_APP_BACK_URL + '/auth/' + type;
  
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createUserAuthData),
    });
  
    if (response.status === 422) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'User auth creation failed failed!' }, { status: 500 });
    }
  
    //i think if it works it should just redirect back to this page?
    //either that or some admin user landing thing
    return redirect('/');
  }
