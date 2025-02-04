import { Navigate } from "react-router";

const PrivateRoute = ({ props  }) => {

    const isauthenticated = localStorage.getItem("userToken"); // check token
    const userRole = localStorage.getItem("userRole");  // check role


    if (isauthenticated && userRole === "admin") {
        return props ;
    }

    return <Navigate to="/" />;
    // return isauthenticated ? props  : <Navigate to="/login" />;
}

export default PrivateRoute;