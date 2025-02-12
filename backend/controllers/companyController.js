const conn = require('../utils/db');

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
        // DELETE FROM `company` WHERE `company`.`id` = 51
        const query = `DELETE FROM company WHERE id = ?`;
        conn.query(query, [companyId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'Company not found', statusCode: 404 });
            } else {
                res.json({ message: 'Company deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        console.log(err)
        res.json({ message: 'Internal server error on delete Company', statusCode: 500 });
    }
}

// create new company 
const updateCompany = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!name || !id) { return res.json({ message: "Company ID and name are required", statusCode: 400 }); }
        const sql = `UPDATE company SET name=? WHERE id=?`;

        conn.query(sql, [name, id], (err, result) => {
            if (err) { return res.status(500).json({ message: "Failed to update company", statusCode: 500, error: err.message }); }
            res.status(200).json({ message: "Company updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on create company", statusCode: 500 }); }
};

module.exports = {
    createComapny, deleteCompany, updateCompany
};
