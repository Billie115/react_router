import { redirect, type ActionFunctionArgs } from "react-router";
import { userInsert } from "../Database/db.server";
import Register from "../Pages/Register";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        let status = 0;
        status = await userInsert(email, password);
        return { status }
    } catch (e) {
        console.error(e);
        return { error: "Registration failed" };
    }
}

export default Register;