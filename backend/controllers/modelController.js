const conn = require('../utils/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

// Login/ Sign Up
const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.json({ message: "Missing required fields", statusCode: 400 });
        }

        const query = 'SELECT * FROM `users` WHERE `email` = ? AND `password` = ? AND `role` = ?;'
        conn.query(query, [email, password, role], (err, results) => {
            if (err) {
                return res.json({ message: "Database query error", details: err, statusCode: 500 });
            }

            if (results.length > 0) {
                // return res.json({ message: "Login successful", user: results[0], statusCode: 200 });
                const user = results[0];

                // Generate JWT Token
                const token = jwt.sign(
                    { id: user.id, email: user.email, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }  // Token expires in 1 hour
                );

                return res.json({
                    message: "Login successful",
                    user: user,
                    token: token,
                    statusCode: 200,
                });
            } else {
                return res.json({ message: "Invalid credentials", statusCode: 401 });
            }
        });
    }
    catch (err) {
        res.json({ message: 'Internal server error on login user', statusCode: 500 });
    }
}

// Create a new user
const userCreate = async (req, res) => {
    try {
        const { name, email, password, role, number, file_upload } = req.body;
        if (!name || !email || !password || !role) {
            return res.json({ message: "Missing required fields", statusCode: 400 });
        }
        const checkQuery = `SELECT * FROM users WHERE email = ?`;
        const [existingUsers] = await conn.promise().query(checkQuery, [email]);

        if (existingUsers.length > 0) {
            return res.json({ message: "Email already exists, use another email", statusCode: 400 });
        }

        const query = `INSERT INTO users (name, email, password, role, number, file_upload) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, email, password, role, number, file_upload];
        const [result] = await conn.promise().query(query, values);

        res.json({ message: "User created successfully", userId: result.insertId, statusCode: 200 });

    } catch (error) {
        res.json({ message: "Internal server error on create user", statusCode: 500 });
    }
};

// Delete new user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            res.json({ message: 'User id is required', statusCode: 400 });
        }
        const query = `DELETE FROM users WHERE id = ?`;
        conn.query(query, [userId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'User not found', statusCode: 404 });
            } else {
                res.json({ message: 'User deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

// Update new user   
const updateUser = async (req, res) => {
    try {
        const { id, fullname, password, role, number, file_upload } = req.body;
        const name = fullname;
        if (!id) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }
        const query = `UPDATE users SET name=?,password=?,role=?,file_upload=?,number=? WHERE id = ?`;

        const value = [name, password, role, file_upload, number, id];
        const [result] = await conn.promise().query(query, value);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        res.json({ message: "User updated successfully", status: 200 });
    } catch (error) {
        res.json({ message: "Internal server error on create user", statusCode: 500 });
    }
};

// Display all users
const showUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM `users` WHERE 1;';
        conn.query(query, (err, results) => {
            if (err) {
                return res.statusCode(500).json({ message: 'Internal server error' });
            }
            res.json({ users: results, statusCode: 200 });
        });
    } catch (error) {
        res.json({ message: 'Internal server error on show user', statusCode: 500 });
    }
}

// For update show User 
const updateShowUser = async (req, res) => {
    const { id } = req.query;
    try {
        const query = 'SELECT * FROM `users` WHERE id = ?;';
        const [user] = await conn.promise().query(query, [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user[0] });
    } catch (error) {
        res.json({ message: 'Internal server error on show user', statusCode: 500 });
    }
}

// Image store in frontend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../client/public/upload');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filename
    }
});

// Initialize Multer Middleware
const uploadFile = multer({ storage: storage }).single('file');

module.exports = {
    userCreate, showUsers, Login, deleteUser, updateUser, updateShowUser, uploadFile
};
