import pool from "../config/db.config.js"

export const getUser = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM `user`");
    
    res.status(200).json(rows);

    console.log("a request was made")
  
}

