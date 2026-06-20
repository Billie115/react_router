import { redirect, type ActionFunctionArgs } from "react-router";
import { login } from "../Database/db.server";
import Login from "../Pages/Login";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        let status = 0;
        status = await login(email, password);
        if(status === 1){
          return redirect("/MainPage")
        }
        return { status: 2 };
    } catch (e) {
        console.error(e);
        return { error: "Registration failed" };
    }
}

export default Login;