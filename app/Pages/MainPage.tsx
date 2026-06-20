import { Form } from "react-router";

function MainPage(){
    return(
        <div>
            <h1>eisai gay!</h1>
            <Form method="post" action="/logout">
                <button type="submit">Logout</button>
            </Form>
        </div>
    );
}

export default MainPage;