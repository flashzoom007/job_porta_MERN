import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Chart from './Popup/Chart';
import { CiFilter } from "react-icons/ci";
import { FaSortAlphaUp, FaSortAlphaUpAlt, FaEdit, FaTrash } from "react-icons/fa";
import { fetchUsers, filterUsersByRole, handleSort, handleDelete, deleteAll } from './Users/CommonApi';
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Display 10 users per page
    const [totalUsers, setTotalUsers] = useState(0);
    const [roleCounts, setRoleCounts] = useState({
        student: 0,
        recruiter: 0,
        admin: 0,
    });
    const [selectedRole, setSelectedRole] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    // Fetch users on component mount
    const fetchUsersData = async () => {
        setIsLoading(true);
        const fetchedUsers = await fetchUsers();
        if (fetchedUsers.length > 0) {
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setTotalUsers(fetchedUsers.length);

            const roleCounts = fetchedUsers.reduce((counts, user) => {
                counts[user.role] = (counts[user.role] || 0) + 1;
                return counts;
            }, {});

            setRoleCounts(roleCounts);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    // Filter the users based on the selected role
    const filterByRole = (role) => {
        filterUsersByRole(users, role, setFilteredUsers, setSelectedRole, setCurrentPage);
    };

    // Sorting function
    const sortUsers = (column) => {
        handleSort(filteredUsers, setFilteredUsers, sortConfig, setSortConfig, column);
    };

    // Delete User
    const deleteUser = async (userId) => {
        await handleDelete(userId, users, filteredUsers, setUsers, setFilteredUsers);
    };

        // Logic for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="m-5">
            <h1 className="text-center fw-bold text-decoration-underline mb-3">All Users List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="">
                    <div className="d-flex justify-content-between mb-3">
                        <select
                            id="chartType"
                            className="form-select w-25"
                            onChange={(e) => filterByRole(e.target.value)}
                            value={selectedRole}>
                            <option value="">All Users ({totalUsers})</option>
                            <option value="admin">Admin ({roleCounts.admin || 0})</option>
                            <option value="student">Student ({roleCounts.student || 0})</option>
                            <option value="recruiter">Recruiters ({roleCounts.recruiter || 0})</option>
                        </select>
                        <button
                            className="btn btn-primary w-25 p-2"
                            onClick={() => setShowPopup(true)}
                        >
                            Show Popup
                        </button>

                        <div className="w-25 d-flex justify-content-between">
                            <Link to='/job' className="text-decoration-none">
                                <button className="btn btn-outline-primary link-hover">Add User <FaAngleRight /></button>
                            </Link>
                            <Link to='/users' className="text-decoration-none" onClick={deleteAll}>
                                <button className="btn btn-outline-danger link-hover">Delete All <FaTrash /></button>
                            </Link>
                        </div>

                    </div>
                    <div className="table-responsive">
                        {/* Users Table */}
                        <table className="table table-bordered table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th onClick={() => sortUsers("name")} style={{ cursor: "pointer" }}>
                                        Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />) : <CiFilter />}
                                    </th>
                                    <th onClick={() => sortUsers("email")} style={{ cursor: "pointer" }}>
                                        Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />) : <CiFilter />}
                                    </th>
                                    <th onClick={() => sortUsers("role")} style={{ cursor: "pointer" }}>
                                        Role {sortConfig.key === "role" ? (sortConfig.direction === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />) : <CiFilter />}
                                    </th>
                                    <th onClick={() => sortUsers("number")} style={{ cursor: "pointer" }}>
                                        Phone {sortConfig.key === "number" ? (sortConfig.direction === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />) : <CiFilter />}
                                    </th>
                                    <th>File Upload</th>
                                    <th onClick={() => sortUsers("created_at")} style={{ cursor: "pointer" }}>
                                        Created {sortConfig.key === "created_at" ? (sortConfig.direction === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaUpAlt />) : <CiFilter />}
                                    </th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="fw-bold">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                                            <td>{user.name}</td>
                                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                            <td className="text-capitalize">{user.role}</td>
                                            <td><a href={`tel:${user.number}`}>{user.number || "N/A"}</a></td>
                                            <td>
                                                {user.file_upload ? (
                                                    <a
                                                        href={`${import.meta.env.VITE_FRONTEND_URL}/upload/${user.file_upload}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {/* {user.file_upload} */}
                                                        <img src={`${import.meta.env.VITE_FRONTEND_URL}/upload/${user.file_upload}`} alt={user.file_upload} width="50" height="50" />
                                                    </a>
                                                ) : (
                                                    "No File"
                                                )}
                                            </td>
                                            <td>{new Date(user.created_at).toISOString().split('T')[0]}</td>
                                            <td>
                                                <Link to={`update-user/${user.id}`}><button className="btn btn-outline-primary"><FaEdit /></button></Link>
                                            </td>
                                            <td><button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}><FaTrash /></button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-secondary"
                        >
                            Previous
                        </button>
                        <span className="mx-2">Page {currentPage}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage * usersPerPage >= users.length}
                            className="btn btn-secondary"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <Modal
                show={showPopup}
                onHide={() => setShowPopup(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Chart roleCounts={roleCounts} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPopup(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Users;
