import { sendMailNotification } from "../mailjet/mailjet.js"
import dotenv from 'dotenv';
import pool from "../../config/db.config.js"

const  mailSender =  async (userID) => {
      
   // sql request for get admin and superior data
   const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
   const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"
   
   const getSuperiorID = await pool.query(fetchUserSuperior, userID)
   const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)
   
   // store the data about superior
   const superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
   console.log(superiorName)
   const superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email
  console.log(superiorEmail)
  
   // fake admin, we need the real one
   const adminName = process.env.ADMIN_NAME
   const adminEmail = process.env.ADMIN_EMAIL
 
   // send email notification
   await sendMailNotification(superiorName, superiorEmail, adminName, adminEmail)

}

export default mailSender