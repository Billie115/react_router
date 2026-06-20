import { Form, useActionData } from "react-router";

function Register(){
    const actionData = useActionData() as { status: number, error?: string } | undefined;
    return(
        <div className="border border-secondary bg-primary text-white w-25 p-3 rounded mx-auto mt-5 shadow">
            <Form method="post" id="formRegister" key={actionData?.status === 1 ? "reset" : "form"}>
                <label htmlFor="Email" className='form-label'>Email:</label>
                <input type="text" name="email" className='form-control' placeholder="Your Email goes here"/>
                <label htmlFor="Password" className='form-label'>Password:</label>
                <input type="password" name="password" className='form-control' placeholder="Your Password goes here"/>

                {actionData?.status === 1 && (
                    <p className="text-success mt-2">mprabo malaka ekanes register</p>
                )}
                {actionData?.status === 2 && (
                    <p className="text-danger mt-2">re papara pws ekanes la8os sto register</p>
                )}
                <button type="submit" className='btn btn-light mt-3'>Register</button>
            </Form>
        </div>
    );
}

export default Register;