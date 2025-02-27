const conn = require('../utils/db');

// Apply for job
const CreateApplyForJob = async (req, res) => {
    try {
        const { id, company_name, user_name, position_name, resume } = req.body;

        // Check if all required fields are present
        if (!id || !company_name || !user_name || !position_name || !resume) {
            return res.status(400).json({ message: "All fields are required", statusCode: 400 });
        }

        // SQL Query
        const insertSql = `
            INSERT INTO job_apply_list 
            (id, company_name, user_name, position_name, resume, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())`;

        // Execute Query
        conn.query(insertSql, [id, company_name, user_name, position_name, resume], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database error", statusCode: 500, error: err.message });
            }
            return res.status(200).json({ message: "Applied for job successfully", statusCode: 200, data: result });
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", statusCode: 500, error: error.message });
    }
};

// Delete Apply for job Profile
const deleteApplyForJob = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM job_apply_list WHERE id = ?`;
        conn.query(query, [companyId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'Company not found', statusCode: 404 });
            } else {
                res.json({ message: 'Company deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete Company', statusCode: 500 });
    }
}


// Delete All Apply for job Profile
const deleteAllApplyForJob = async (req, res) => {
    try {
        const query = `DELETE FROM job_apply_list WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Apply list are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

module.exports = {
    CreateApplyForJob, deleteApplyForJob, deleteAllApplyForJob
};
