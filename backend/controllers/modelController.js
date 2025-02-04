const conn = require('../utils/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//! Login/ Sign Up
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

//! Create a new user
const userCreate = async (req, res) => {
    try {
        const { name, email, password, role, number, file_upload } = req.body;

        if (!name || !email || !password || !role) {
            return res.json({ message: "Missing required fields", statusCode: 400 });
        }
        // Check if the email already exists
        const checkQuery = `SELECT * FROM users WHERE email = ?`;
        const [existingUsers] = await conn.promise().query(checkQuery, [email]);

        if (existingUsers.length > 0) {
            return res.json({ message: "Email already exists, use another email", statusCode: 400 });
        }

        const query = `INSERT INTO users (name, email, password, role, number, file_upload) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, email, password, role, number, file_upload || null];
        const [result] = await conn.promise().query(query, values);

        res.json({ message: "User created successfully", userId: result.insertId, statusCode: 200 });

    } catch (error) {
        res.json({ message: "Internal server error on create user", statusCode: 500 });
    }
};

//! Delete new user
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

//? Update new user
// UPDATE `users` SET `id`='[value-1]',`name`='[value-2]',`email`='[value-3]',`password`='[value-4]',`role`='[value-5]',`file_upload`='[value-6]',`number`='[value-7]',`created_at`='[value-8]' WHERE 1
const updateUser = async (req, res) => {
    try {
        const { id, name, email, password, role, number, file_upload } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }
        const query = `UPDATE users SET name=?,password=?,role=?,file_upload=?,number=? WHERE id = ?`;

    } catch (error) {
        res.json({ message: "Internal server error on create user", statusCode: 500 });
    }
};


//! Display all users
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

module.exports = {
    userCreate, showUsers, Login, deleteUser, updateUser
};
