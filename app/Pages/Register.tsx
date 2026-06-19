import { Form, redirect, type ActionFunction, type ActionFunctionArgs } from "react-router";
export async function action({request}: ActionFunctionArgs) {
    const FormData = await request.formData();
}

function Register(){
    function mpampis(){
        return redirect ("/Login")
    }
    return(
        <body className="bg-dark text-white">
            <div className="border border-secondary bg-primary text-white w-25 p-3 rounded mx-auto mt-5 shadow">
                <Form method="post" id="formRegister">
                    <label htmlFor="Email" className='form-label'>Email:</label>
                    <input type="text" name="email" className='form-control' placeholder="Your Email goes here"/>
                    <label htmlFor="Password" className='form-label'>Password:</label>
                    <input type="password" name="password" className='form-control' placeholder="Your Password goes here"/>
                    <button type="submit" onClick={mpampis} className='btn btn-light mt-3'>Register</button>
                </Form>
            </div>
        </body>
    )
}
export default Register;