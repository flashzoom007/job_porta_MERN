import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const isauthenticated = localStorage.getItem("userToken");
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        navigate("/login");
    }
    return (
        <>
            <header className="bg-light py-3">
                <div className="container d-flex flex-wrap justify-content-between align-items-center">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none mb-3 mb-md-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="bi bi-box-seam bg-primary text-white rounded-circle p-2" width="40" height="40" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ms-3 fs-4">Home</span>
                    </a>

                    <nav className="nav nav-menu">
                        <Link to="/">Home</Link>
                        {isauthenticated && userRole === "admin" && <Link to="/users">All Uses</Link>}
                        <Link to="/job">Register</Link>
                        <Link to="/chart">Charts</Link>
                        <Link to="/job-create">Job Create</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>

                    <Link to="/login"
                        onClick={handleLogout}
                        className="text-dark text-decoration-none">
                        <button type="button"
                            className="btn btn-outline-secondary d-flex align-items-center mt-3 mt-md-0">

                            {isauthenticated ? 'Logout' : 'Login'}

                            <svg fill="none" stroke="currentColor" className="bi bi-arrow-right ms-2" width="16" height="16" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7">  </path>
                            </svg>
                        </button>
                    </Link>

                </div>
            </header>


        </>
    )
}

export default Header