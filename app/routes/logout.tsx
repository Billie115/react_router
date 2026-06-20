import { type ActionFunctionArgs } from "react-router";
import { destroyUserSession } from "../Database/session.server";

export async function action({ request }: ActionFunctionArgs) {
    return destroyUserSession(request);
}