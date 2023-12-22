import pool from '../config/db.config.js'
import { sendNotification } from '../utilities/notification/notification.js'

export const updateOpenedOn = async (req, res) => {
    const { id } = req.params

    try {

        let Today = new Date()
        const sqlUpdateOpenedOn = 'UPDATE Notification SET isOpened = TRUE WHERE id = ?'
        const sqlFetchTheNotif = "SELECT n.id AS id, CONCAT(tb.firstName, ' ', tb.lastName) AS triggeredBy, CONCAT(tu.firstName, ' ', tu.lastName) AS targetedUser, CONCAT(nf.firstName, ' ', nf.lastName) AS forUser, n.type, n.formID, n.isOpened, n.creationDate FROM Notification AS n INNER JOIN User AS tb ON n.triggeredBy = tb.id INNER JOIN User AS tu ON n.targetedUser = tu.id LEFT JOIN Form AS nf ON n.formID = nf.id WHERE n.id = ?"

        await pool.query(sqlUpdateOpenedOn, id)

        const storeTheNotif = await pool.query(sqlFetchTheNotif, id)

        res.status(201).json(storeTheNotif[0])
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllNotificationByUser = async (req, res) => {
    const { userID } = req.params

    try {

        const sqlAllNotifGoodInfoQuery = `SELECT n.id AS id, CONCAT(tb.firstName, ' ', tb.lastName) AS triggeredBy, CONCAT(tu.firstName, ' ', tu.lastName) AS targetedUser, CONCAT(nf.firstName, ' ', nf.lastName) AS forUser, n.type, n.formID, n.isOpened, n.creationDate FROM Notification AS n INNER JOIN User AS tb ON n.triggeredBy = tb.id INNER JOIN User AS tu ON n.targetedUser = tu.id LEFT JOIN Form AS nf ON n.formID = nf.id WHERE tu.id = ?;`
        const storeAllGoodInfoQuery = await pool.query(sqlAllNotifGoodInfoQuery, userID)

        res.status(201).json(storeAllGoodInfoQuery[0])
    } catch (error) {
        console.error('Error in fetchAllNotification:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const createNotifAfterApproved = async (req, res) => {
    try {
        const { userID, formID } = req.body

        let typeNotif = 2
        let targetedUser = ''
        let triggeredBy = userID

        sendNotification(targetedUser, triggeredBy, typeNotif, formID)
    } catch (error) {}
}
