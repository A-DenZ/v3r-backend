import pool from "../config/db.config.js"
import dotenv from 'dotenv'
import {validateForm} from '../utilities/request/request.js'

export const storeSharedLink = async (req, res) => {
    try{
            const {
                id,
                title,
                link,
            } = req.body

            console.log(req.body)

       // const storeValidInformation = validateForm(title,link)
       // if(!storeValidInformation?.[0]) return res.status(storeValidInformation?.[1]).json({message: storeValidInformation?.[2]})
        
       const sqlInsertSharedLink = "INSERT INTO shareddocument (id,title,link) VALUES (?,?,?)"
       const sqlFetchAllInfos = "SELECT * FROM shareddocument"

       const storeSharedLinkQuery = await pool.query(sqlInsertSharedLink, [id, title,link])
       const returnFormObject = await pool.query(sqlFetchAllInfos)

    } catch(error){
        console.log(error)
        res.status(500).json({message : 'Erreur du serveur'})
}
}

export const fetchAllSharedLink = async (req,res) => {

    try{

        const sqlFetchAllSharedLink = "SELECT * FROM shareddocument"
        const storeAllSharedLink = await pool.query(sqlFetchAllSharedLink)

        console.log(storeAllSharedLink)
        res.status(201).json(storeAllSharedLink)
    }catch(error){
        console.log(error)
        res.status(500).json({message : 'Erreur du serveur'})
}
}