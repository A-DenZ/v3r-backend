import pool from "../config/db.config.js"

export const getUser = async (req, res) => {
    const [rows] = await pool.query("SELECT AccessLevel, email, employeeCode, firstName, id, lastName, position, superior FROM `user`");
    
    res.status(200).json(rows);

    console.log("a request was made")
  
}

