import pool from "../config/db.config.js"

export const login = async (req, res) => {
    const { employeeCode } = req.body;

    try {
        
        const user = await pool.query("SELECT u.id, d.*, u.* FROM user as u INNER JOIN department as d ON u.departmentId = d.id WHERE employeeCode = ?", [employeeCode]);
    
        if (user?.[0].length === 0) return res.status(404).json({ message: "Utilisateur non-existant." });
    
        console.log(user?.[0]?.[0])
        
        res.status(200).json(user?.[0]?.[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

