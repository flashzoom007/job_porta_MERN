const conn = require('../utils/db');

//! *************** Company API start 
// create new company 
const createComapny = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) { return res.json({ message: "Please provide a name", statusCode: 400 }); }

        const sql = "INSERT INTO `company`(`name`) VALUES (?)";

        conn.query(sql, [name], (err, result) => {
            if (err) {
                return res.json({ message: "Company alredy exist...!, try other one.", statusCode: 100, });
            }
            return res.json({ message: "Company created successfully", statusCode: 200, companyId: result.insertId });
        });
    } catch (error) {
        return res.json({ message: "Internal server error on create company", statusCode: 500 });
    }
};

// Delete company
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM company WHERE id = ?`;
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

// update new company 
const updateCompany = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!name || !id) { return res.json({ message: "Company ID and name are required", statusCode: 400 }); }
        const sql = `UPDATE company SET name=? WHERE id=?`;

        conn.query(sql, [name, id], (err, result) => {
            if (err) { return res.json({ message: "Company name is already exist...!, try one name", statusCode: 100, error: err.message }); }
            res.json({ message: "Company updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on create company", statusCode: 500 }); }
};
//! *************** Company API End 

//! *************** Company Profile API start 
// Delete company Profile
const deleteCompanyProfile = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM company_profile WHERE id = ?`;
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

// Delete company profile
const createCompanyProfile = async (req, res) => {
    try {
        const { name, description, url, image } = req.body;

        if (!name || !description || !url || !image) {
            return res.json({ message: "All fields are required", statusCode: 400 });
        }

        // Check if the company name already exists
        const checkSql = "SELECT id FROM `company_profile` WHERE name = ?";
        conn.query(checkSql, [name], (err, results) => {
            if (err) {
                return res.json({ message: "Database error", statusCode: 500, error: err.message });
            }
            if (results.length > 0) {
                return res.json({ message: "Company name already exists", statusCode: 100 });
            }

            // If name doesn't exist, insert the new record
            const insertSql = "INSERT INTO `company_profile`(`name`, `description`, `url`, `image`) VALUES (?, ?, ?, ?)";
            conn.query(insertSql, [name, description, url, image], (err, result) => {
                if (err) {
                    return res.json({ message: "Failed to create company profile", statusCode: 500, error: err.message });
                }
                return res.json({ message: "Company profile created successfully", statusCode: 200, data: result });
            });
        });

    } catch (error) {
        return res.json({ message: "Internal server error", statusCode: 500 });
    }
};

// update new company profile
const updateCompanyProfile = async (req, res) => {
    try {
        const {id, name, description, url, image } = req.body;

        if (!name || !description || !url || !image) {
            return res.json({ message: "Company profile Details are required", statusCode: 400 });
        }
        const sql = "UPDATE `company_profile` SET name=?,description=?,url=?,image=? WHERE id=?";
 
        conn.query(sql, [name, description, url, image, id], (err, result) => {
            res.json({ message: "Company Profile updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on create company", statusCode: 500 }); }
};

//! *************** Company Profile API End 

module.exports = {
    createComapny, deleteCompany, updateCompany, deleteCompanyProfile, createCompanyProfile, updateCompanyProfile
};