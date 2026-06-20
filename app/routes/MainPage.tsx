import { type LoaderFunctionArgs } from "react-router";
import { requireUserSession } from "~/Database/session.server";
import MainPage from "../Pages/MainPage";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserSession(request);
    return null;
}

export default MainPage;