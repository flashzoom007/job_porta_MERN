import { toast } from "react-toastify";
import axios from "axios";
let file = null;

//! Users Start
// Fetch Users API
export const fetchUsers = async () => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-users`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (data.statusCode === 200 || data.users) {
            return data.users;
        } else {
            toast.error(data.response);
            return [];
        }
    } catch (error) {
        toast.error("An unexpected error occurred.");
        return [];
    }
};

// Delete Single User API
export const deleteUser = async (userId) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete/${userId}`;
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// delete All users 
export const deleteAll = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all users?");
    if (!isConfirmed) {
        return;
    }
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-users`;
    const response = await fetch(apiUrl, {
        method: "DELETE",
        "Content-Type": "application/json"
    });

    const data = await response.json();

    if (data.statusCode === 200) {
        toast.success(data.message);
        setTimeout(() => {
            window.location.reload();
        });
        return data.message;
    } else {
        toast.error(data.message);
        return data.message;
    }
}

// Filter Users by Role
export const filterUsersByRole = (users, role, setFilteredUsers, setSelectedRole, setCurrentPage) => {
    setSelectedRole(role);
    if (role === "") {
        setFilteredUsers(users);
    } else {
        setFilteredUsers(users.filter(user => user.role === role));
    }
    setCurrentPage(1);
};

// Delete User Function
export const handleDelete = async (userId, users, filteredUsers, setUsers, setFilteredUsers) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
        return;
    }

    const result = await deleteUser(userId);

    if (result.statusCode === 200) {
        toast.success(result.message);

        // Remove the deleted user from both users and filteredUsers
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);

        const updatedFilteredUsers = filteredUsers.filter(user => user.id !== userId);
        setFilteredUsers(updatedFilteredUsers);
    } else {
        toast.error(result.message);
    }
};
//! Users End

// Sorting Function
export const handleSort = (filteredUsers, setFilteredUsers, sortConfig, setSortConfig, column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
        direction = "desc";
    }
    setSortConfig({ key: column, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        return 0;
    });

    setFilteredUsers(sortedUsers);
};

// Function to handle file selection
export const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Only image files are allowed!");
            e.target.value = "";
            return;
        }
        file = selectedFile; // Set the selected file to the file variable
        toast.success("File selected successfully.");
    }
    // setSelectedFile(file);
};

// Function to handle file upload
export const handleUpload = async () => {
    if (!file) {
        // toast.error("Please select a file to upload.");
        return null;
    }

    try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadApiUrl = `${import.meta.env.VITE_BACKEND_URL}/upload-file`;
        const response = await axios.post(uploadApiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.statusCode === 200) {
            // toast.success("File uploaded successfully.");
            return response.data.fileName;
        } else {
            toast.error(response.data.message);
            return null;
        }
    } catch (error) {
        toast.error("File upload failed.");
        return null;
    }
};

//! company Start
// get All company 
export const getAllCompany = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-company`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;

        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.users);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// Delete all companies
export const deleteAllCompanys = async () => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-companys/`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// Delete company
export const deleteCompany = async (companyId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-company/${companyId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
                // window.location.reload();
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};
//! Company  End

//! Company Profile Start
// get All company Profile
export const getAllCompanyProfile = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-company_profile`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;

        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.users);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// Delete company Profile
export const deleteCompanyProfile = async (companyId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-company-profile/${companyId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
                // window.location.reload();
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// Delete all companies
export const deleteAllProfiles = async () => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-profiles/`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};


//! Company Profile End

//! Job Position Start
// show all positions
export const getAllJobPosition = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-job_position`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;

        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.users);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// Delete company
export const deleteJobPosition = async (PositionId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-job-profile/${PositionId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// delete All Jobs 
export const deleteAllJobs = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all users?");
    if (!isConfirmed) {
        return;
    }
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-jobs`;
    const response = await fetch(apiUrl, {
        method: "DELETE",
        "Content-Type": "application/json"
    });

    const data = await response.json();

    if (data.statusCode === 200) {
        toast.success(data.message);
        setTimeout(() => {
            window.location.reload();
        });
        return data.message;
    } else {
        toast.error(data.message);
        return data.message;
    }
}
//! Position End

//! Jobs Start
// show all jobs created
export const getAllJobsCreated = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-job_create_list`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;
        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.users);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// show all jobs created
export const getShowJobUsers = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/all-jobs-display`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;
        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.jobs);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// Delete single created job
export const deleteCreatedJobPosition = async (PositionId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-create-job-profile/${PositionId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Job deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// delete All Jobs 
export const deleteAllCreatedJobs = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all users?");
    if (!isConfirmed) {
        return;
    }
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-jobs-create`;
    const response = await fetch(apiUrl, {
        method: "DELETE",
        "Content-Type": "application/json"
    });

    const data = await response.json();

    if (data.statusCode === 200) {
        toast.success(data.message);
        setTimeout(() => {
            window.location.reload();
        });
        return data.message;
    } else {
        toast.error(data.message);
        return data.message;
    }
}
//!  Jobs End

//! Apply for Start
// show all jobs created
export const getAllApplyForJob = async (setCompanyShow, setShowModal) => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-job_apply_list`;
        const response = await axios.get(apiUrl);

        const responseData = response.data;
        if (responseData.statusCode === 200) {
            setCompanyShow(responseData.users);
            setShowModal(false);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        // toast.error("Error fetching companies. Check console for details.");
    }
};

// Delete single created job
export const deleteApplyForJob = async (companyId) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-apply-for-job/${companyId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (data.statusCode === 200) {
                toast.success(data.message);
                // window.location.reload();
            } else {
                toast.error(data.message);
            }
        } else {
            toast.info("Company deletion cancelled.");
            return { statusCode: 400, message: "Deletion cancelled by user" };
        }

    } catch (error) {
        toast.error("An unexpected error occurred while deleting.");
        return { statusCode: 500, message: "Error deleting user" };
    }
};

// delete All created job
export const deleteAllApplyForJob = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all users?");
    if (!isConfirmed) {
        return;
    }
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/delete-all-apply-for-job`;
    const response = await fetch(apiUrl, {
        method: "DELETE",
        "Content-Type": "application/json"
    });

    const data = await response.json();

    if (data.statusCode === 200) {
        toast.success(data.message);
        setTimeout(() => {
            window.location.reload();
        });
        return data.message;
    } else {
        toast.error(data.message);
        return data.message;
    }
}


//! Apply for End