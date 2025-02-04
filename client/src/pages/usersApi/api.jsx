import { toast } from "react-toastify";

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

// Delete User API
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
