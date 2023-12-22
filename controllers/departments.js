import pool from '../config/db.config.js'

export const fetchDepartments = async (req, res) => {
    try {
        const fetchAllDepartments = 'SELECT name FROM department'
        
        const departments = await pool.query(fetchAllDepartments)

        const departmentNames = departments?.[0].map(department => department.name)

        res.status(200).json(departmentNames)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erreur du serveur' })
    }
}