import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "../network/AuthenticationProvider";

export function ProtectedRoute(props: { children: JSX.Element}) {
    const {  authenticated } = useAuthentication();
    const location = useLocation();
    
    if (authenticated) return props.children;
    else return <Navigate to="/" replace state={{from: location}} />;
}