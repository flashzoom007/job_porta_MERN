import { toast } from "react-toastify";
import axios from "axios";
let file = null;

// Fetch Users API
export const fetchUsers = async () => {
    try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/show-users`;
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mapper: {
                    cols: ["id", "name", "email", "role", "number", "file_upload"],
                },
            }),
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
            toast.success("File uploaded successfully.");
            return response.data.fileName;
        } else {
            toast.error(response.data.message);
            return null;
        }
    } catch (error) {
        toast.error("File upload failed.");
        console.error("File upload error:", error);
        return null;
    }
};