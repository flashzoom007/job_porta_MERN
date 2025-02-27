import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [userOpen, setuserOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("userToken");
    const userRole = localStorage.getItem("userRole");
    const [username, setUsername] = useState("");
    const [userrole, setUserrole] = useState("");
    const dropdownRef = useRef(null);
    const companyDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        navigate("/login");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
                setCompanyOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setuserOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const storedUsername = localStorage.getItem("userName");
        const storedUserrole = localStorage.getItem("userRole");
        if (storedUsername) {
            setUsername(storedUsername);
            setUserrole(storedUserrole);
        }
    }, []);

    // Only admin and recruiter can see
    useEffect(() => {
        if (['company-name', 'company-Profile', 'job-position'].includes(window.location.pathname) && userRole !== "admin" && userRole !== "recruiter") {
            navigate("/");
        }
    }, [userRole, navigate]);

    return (
        <>
            <header className="bg-light py-3">
                <div className="container d-flex flex-wrap justify-content-between align-items-center">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                            className="bi bi-box-seam bg-primary text-white rounded-circle p-2" width="40" height="40"
                            viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </a>

                    <nav className="nav nav-menu">
                        <Link to="/">Home</Link>
                        {isAuthenticated && userRole === "admin" && <Link to="/users">All Users</Link>}
                        <Link to="/job">New User Create</Link>
                        <Link to="/show-jobs">Show All Jobs</Link>

                        {/* How Many Apply */}
                        {(userRole === "admin" || userRole === "recruiter") && (
                            <div className="nav-item dropdown" ref={userDropdownRef}>
                                <button
                                    className="nav-link dropdown-toggle btn btn-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setuserOpen((prev) => !prev);
                                    }}
                                >
                                    Users
                                </button>
                                {userOpen && (
                                    <ul className="dropdown-menu show position-absolute">
                                        <li><Link to="/job-apply-list" className="dropdown-item">How Apply for</Link></li>
                                        {/* <li><Link to="/company-Profile" className="dropdown-item">Company Profile</Link></li>
                                        <li><Link to="/job-position" className="dropdown-item">Job Positions</Link></li> */}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Company Dropdown */}
                        {(userRole === "admin" || userRole === "recruiter") && (
                            <div className="nav-item dropdown" ref={companyDropdownRef}>
                                <button
                                    className="nav-link dropdown-toggle btn btn-light"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCompanyOpen((prev) => !prev);
                                    }}
                                >
                                    Company
                                </button>
                                {companyOpen && (
                                    <ul className="dropdown-menu show position-absolute">
                                        <li><Link to="/company-name" className="dropdown-item">All Company</Link></li>
                                        <li><Link to="/company-Profile" className="dropdown-item">Company Profile</Link></li>
                                        <li><Link to="/job-position" className="dropdown-item">Job Positions</Link></li>
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Unknown Dropdown */}
                        <div className="nav-item dropdown" ref={dropdownRef}>
                            <button
                                className="nav-link dropdown-toggle btn btn-light"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen((prev) => !prev);
                                }}
                            >
                                Unknown
                            </button>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu show position-absolute">
                                    <li><Link to="/youtube-playlist" className="dropdown-item">Youtube Playlist Download</Link></li>
                                    <li><Link to="/charts" className="dropdown-item">Charts</Link></li>
                                </ul>
                            )}
                        </div>

                        <Link to="/job-create">Job Create</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>

                    <div className="d-flex justify-content-end w-100 mt-3 gap-3 align-items-center">

                        {isAuthenticated && (
                            <span className="d-flex gap-3">
                                <div className="text-dark">
                                    User: <strong>{username}</strong>
                                </div>
                                <div className="text-dark">
                                    Role: <strong>{userrole.charAt(0).toUpperCase() + userrole.slice(1)}</strong>
                                </div>
                            </span>
                        )}
                        <Link to="/login" onClick={handleLogout} className="text-dark text-decoration-none">
                            <button type="button"
                                className="btn btn-outline-secondary d-flex align-items-center mt-3 mt-md-0">
                                {isAuthenticated ? 'Logout' : 'Login'}
                                <svg fill="none" stroke="currentColor" className="bi bi-arrow-right ms-2"
                                    width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </Link>


                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;

