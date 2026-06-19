import { Form } from 'react-router';

function Login() {
  return (
    <body className="bg-dark text-white">
        <div className="border border-secondary bg-primary text-white w-25 p-3 rounded mx-auto mt-5 shadow">
            <Form action="POST" id="formLogin">
                <label htmlFor="Email" className='form-label'>Email:</label>
                <input type="text" className='form-control' placeholder="Your Email goes here"/>
                <label htmlFor="Password" className='form-label'>Password:</label>
                <input type="password" className='form-control' placeholder="Your Password goes here"/>
                <a href="/Register" className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Register Here</a>
                <br/>
                <button type="submit" className='btn btn-light mt-2'>LogIn</button>
            </Form>
        </div>
    </body>
  );
}
export default Login; 