import { useRouteError } from "react-router-dom";


export function ErrorBoundary() {
    let error = useRouteError() as { response?: Response, statusText: string | null, message: string | null }

    return <div>
        <h1>Sorry, something went wrong</h1>
        <div><i>{error.statusText || error.message}</i></div>
    </div>;
}