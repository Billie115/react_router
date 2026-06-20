import { Form, useActionData } from "react-router";

function Login() {
    const actionData = useActionData() as { status: number, error?: string } | undefined;
    return (
        <div className="border border-secondary bg-primary text-white w-25 p-3 rounded mx-auto mt-5 shadow">
            <Form method="post" id="formLogin">
                <label htmlFor="Email" className='form-label'>Email:</label>
                <input type="text" name="email" className='form-control' placeholder="Your Email goes here"/>
                <label htmlFor="Password" className='form-label'>Password:</label>
                <input type="password" name="password" className='form-control' placeholder="Your Password goes here"/>
                <a href="/Register" className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Register Here</a>
                
                {actionData?.status === 2 && (
                    <p className="text-danger mt-2">re papara h kane register, h ebales la8os email/kwdiko</p>
                )}

                <br/>
                <button type="submit" className='btn btn-light mt-2'>LogIn</button>
            </Form>
        </div>
    );
}
export default Login; 