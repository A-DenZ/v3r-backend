
import pool from "../config/db.config.js"
import dotenv from 'dotenv';
import { validateAudiSST, validateForm , validateIncidentReport , validateWorkingAccidentReport , validateSSD } from "../utilities/request/request.js"
import { sendMailNotification } from "../utilities/mailjet/mailjet.js"
import { sendNotification } from "../utilities/notification/notification.js";
import { set } from "mongoose";


export const storeAuditSSTResponse = async (req, res) => {
        try {
                
                const { 
                        userID,
                        firstName,
                        lastName,
                        formName,

                        incidentPlace,
                        incidentDate,
                        incidentHour,
                        EPI,
                        placeConform,
                        safeComportement,
                        signalytics,
                        signalyticsSheets,
                        workingExcavation,
                        confinedSpace,
                        workingMethod,
                        others,
                        distanceRespected,
                        EPIAreOn,
                        procedureRespected,
                        incidentDescription} = req.body

                console.log(req.body)
                
                const storeValidForm = validateForm(userID,firstName,lastName,formName)
                const storeValidAuditSST = validateAudiSST(incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod,/* others,*/ distanceRespected, EPIAreOn, procedureRespected, incidentDescription) // returns array conataining [boolean, status, message]
                

                console.log("validation 1" , storeValidForm?.[2])
                if(!storeValidForm?.[0]) return res.status(storeValidForm?.[1]).json({message: storeValidForm?.[2]})
                console.log("validation 2" , storeValidAuditSST?.[2])
                if(!storeValidAuditSST?.[0]) return res.status(storeValidAuditSST?.[1]).json({ message: storeValidAuditSST?.[2] })
                
                const sqlInsertBaseForm = "INSERT INTO Form (userID,firstName,lastName,formName) VALUES (?,?,?,?)"
                const sqlFetchForm = "SELECT id FROM form WHERE userID = ? AND firstName = ? AND lastName = ? AND formName = ? ORDER BY id DESC LIMIT 1"
                const sqlInsertAuditSST = "INSERT INTO AuditSST (formID, incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod, others, distanceRespected, EPIAreOn, procedureRespected, incidentDescription) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                const sqlFetchAllInfos = "SELECT * FROM Form JOIN AuditSST ON Form.id = AuditSST.formID WHERE Form.id = ? LIMIT 1"
                
                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                               ]
                                                           )

                const formIDFetch = await pool.query(sqlFetchForm, [userID, firstName, lastName, formName])

                let formID = formIDFetch[0]?.[0]?.id

                const storeAuditSSTQuery = await pool.query(sqlInsertAuditSST, 
                                                               [
                                                                formID,
                                                                incidentPlace,
                                                                incidentDate,
                                                                incidentHour,
                                                                EPI,
                                                                placeConform,
                                                                safeComportement,
                                                                signalytics,
                                                                signalyticsSheets,
                                                                workingExcavation,
                                                                confinedSpace,
                                                                workingMethod,
                                                                others,
                                                                distanceRespected,
                                                                EPIAreOn,
                                                                procedureRespected,
                                                                incidentDescription
                                                               ]
                                                           )

                const returnFormObject = await pool.query(sqlFetchAllInfos,formID)

                

                const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
                const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"
                        
                let superiorEmail, superiorName 

                const adminName = process.env.ADMIN_NAME
                const adminEmail = process.env.ADMIN_EMAIL

                const getSuperiorID = await pool.query(fetchUserSuperior, userID)
                console.log("iciiiii" , getSuperiorID[0][0]?.superior)
                if(getSuperiorID[0][0]?.superior){
                        const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)

                        
                        superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
                        superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email

                        console.log("le nom du superieur" , superiorName)
                        console.log("son email" , superiorEmail)
                }

              

                // send notification mail
                if (storeBaseFormQuery && storeAuditSSTQuery ){
                        const recipients = [{ Email: adminEmail, Name: adminName }]
                        if(getSuperiorID[0][0]?.superior){
                                recipients.push({ Email: superiorEmail, Name: superiorName })
                        }
                  //sendMailNotification(recipients)
                }

                let targetedUser, triggeredBy, typeNotif

                if(getSuperiorID[0][0]?.superior){
                        targetedUser = getSuperiorID[0][0]?.superior
                }


                triggeredBy = userID
                typeNotif = 1

                

                
                sendNotification(targetedUser, triggeredBy, typeNotif, formID)

                res.status(201).json(returnFormObject[0][0]) 

                console.log("on a une réponse")
    
        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
    
   
}


export const storeIncidentReportResponse = async (req, res) => {
        try{
                const { userID,
                        firstName,
                        lastName,
                        formName,

                        unitsInvolved,
                        departement,
                        superior,
                        driverLicense,
                        othersVehicules } = req.body


                        console.log("le body" , req.body)
                        
                
                
                const storeValidForm = validateForm(userID,firstName,lastName,formName)
                const storeValidIncidentReport = validateIncidentReport(unitsInvolved,departement,superior,driverLicense,othersVehicules)         
                
                if(!storeValidForm?.[0]) return res.status(storeValidForm?.[1]).json({message: storeValidForm?.[2]})
                if(!storeValidIncidentReport?.[0]) return res.status(storeValidIncidentReport?.[1]).json({ message: storeValidIncidentReport?.[2] })

                const sqlInsertBaseForm = "INSERT INTO Form (userID,firstName,lastName,formName) VALUES (?,?,?,?)"
                const sqlInsertIncidentReport = "INSERT INTO IncidentReport (formID,unitsInvolved,departement,superior,driverLicense,othersVehicules) VALUES (?,?,?,?,?,?)"
                const sqlFetchForm = "SELECT id FROM form WHERE userID = ? AND firstName = ? AND lastName = ? AND formName = ? ORDER BY id DESC LIMIT 1"
                const sqlFetchAllInfos = "SELECT * FROM Form JOIN IncidentReport ON Form.id = IncidentReport.formID WHERE Form.id = ? LIMIT 1"
                
                

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                               ]
                                                            )

                const formIDFetch = await pool.query(sqlFetchForm, [userID, firstName, lastName, formName])

                let formID = formIDFetch[0]?.[0]?.id
                
                const storeIncidentReport = await pool.query(sqlInsertIncidentReport, [
                                                                                        formID,
                                                                                        unitsInvolved,
                                                                                        departement,
                                                                                        superior,
                                                                                        driverLicense,
                                                                                        othersVehicules
                                                                                      ]
                                                            )

                const returnFormObject = await pool.query(sqlFetchAllInfos,formID)

                const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
                const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"

                let superiorEmail, superiorName 

                const adminName = process.env.ADMIN_NAME
                const adminEmail = process.env.ADMIN_EMAIL
                
                const getSuperiorID = await pool.query(fetchUserSuperior, userID)
                console.log("iciiiii" , getSuperiorID[0][0]?.superior)
                if(getSuperiorID[0][0]?.superior){
                        const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)

                        superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
                        superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email
                }
              

                // send notification mail
                if (storeBaseFormQuery && storeIncidentReport ){
                        const recipients = [{ Email: adminEmail, Name: adminName }]
                        if(getSuperiorID[0][0]?.superior){
                                recipients.push({ Email: superiorEmail, Name: superiorName })
                        }
                  //sendMailNotification(recipients)
                }


                res.status(201).json(returnFormObject[0][0])

                console.log("On a une réponse")

        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
}


export const storeWorkingAccidentReport = async (req, res) => {

        try{
                const { userID,
                        firstName,
                        lastName,
                        formName,

                        employeeCode,
                        fonctionWhenHappend,
                        accidentDate,
                        accidentHour,
                        hasWitnesses,
                        witnesses,
                        accidentPlace,
                        activityCenter,
                        injuries,
                        injuriesDescription,
                        violence,
                        accidentDescription,
                        firstAid,
                        secouristName,
                        medicalConsultation } = req.body

                        console.log("le body" , req.body)
                
                const storeValidForm = validateForm(userID,firstName,lastName,formName)
                const storeValidWorkingAccidentReport = validateWorkingAccidentReport(employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,violence,accidentDescription,firstAid,secouristName,medicalConsultation,hasWitnesses)
                

                if(!storeValidForm?.[0]) console.log(storeValidForm?.[2])
                if(!storeValidForm?.[0]) return res.status(storeValidForm?.[1]).json({message: storeValidForm?.[2]})
                if(!storeValidWorkingAccidentReport?.[0]) console.log("2ième validation : " , storeValidWorkingAccidentReport?.[2])
                if(!storeValidWorkingAccidentReport?.[0]) return res.status(storeValidWorkingAccidentReport?.[1]).json({ message: storeValidWorkingAccidentReport?.[2] })
                

                const sqlInsertBaseForm = "INSERT INTO Form (userID,firstName,lastName,formName) VALUES (?,?,?,?)"
                const sqlInsertWorkingAccidentReport = "INSERT INTO WorkingAccidentReport (formID,employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,violence,accidentDescription,firstAid,secouristName,medicalConsultation,hasWitnesses) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" 
                const sqlFetchForm = "SELECT id FROM form WHERE userID = ? AND firstName = ? AND lastName = ? AND formName = ? ORDER BY id DESC LIMIT 1"
                const sqlFetchAllInfos = "SELECT * FROM Form JOIN WorkingAccidentReport ON Form.id = WorkingAccidentReport.formID WHERE Form.id = ? LIMIT 1"
                

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                                ]
                                                        )

                const formIDFetch = await pool.query(sqlFetchForm, [userID, firstName, lastName, formName])

                let formID = formIDFetch[0]?.[0]?.id

                const storeWorkingAccidentReportQuery = await pool.query(sqlInsertWorkingAccidentReport, [
                                                                                                        formID,
                                                                                                        employeeCode,
                                                                                                        fonctionWhenHappend,
                                                                                                        accidentDate,
                                                                                                        accidentHour,
                                                                                                        witnesses,
                                                                                                        accidentPlace,
                                                                                                        activityCenter,
                                                                                                        injuries,
                                                                                                        injuriesDescription,
                                                                                                        violence,
                                                                                                        accidentDescription,
                                                                                                        firstAid,
                                                                                                        secouristName,
                                                                                                        medicalConsultation,
                                                                                                        hasWitnesses      
                                                                                                        ]
                                                                        )

                const returnFormObject = await pool.query(sqlFetchAllInfos,formID)
                
                const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
                const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"
                
                let superiorEmail, superiorName 

                const adminName = process.env.ADMIN_NAME
                const adminEmail = process.env.ADMIN_EMAIL

                const getSuperiorID = await pool.query(fetchUserSuperior, userID)
                console.log("iciiiii" , getSuperiorID[0][0]?.superior)
                if(getSuperiorID[0][0]?.superior){
                        const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)

                        superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
                        superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email
                }


              

                // send notification mail
                if (storeBaseFormQuery && storeWorkingAccidentReportQuery ){
                        const recipients = [{ Email: adminEmail, Name: adminName }]
                        if(getSuperiorID[0][0]?.superior){
                                recipients.push({ Email: superiorEmail, Name: superiorName })
                        }
                  //sendMailNotification(recipients)
                }

                res.status(201).json(returnFormObject[0][0]) 
                // à voir si on fetch pas la bd à la place.  
                
                console.log("on a une réponse")

        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }

}


export const storeSSD = async (req,res) => {
        try{
                const { userID,
                        firstName,
                        lastName,
                        formName,

                        employeeCode,
                        fonctionWhenHappend,
                        activityCenter,
                        incidentDate,
                        incidentHour,
                        witnesses,
                        incidentDescription,
                        correctionsOrAddOn,
                        incidentPlace} = req.body

                        console.log(req.body)
                
                const storeValidForm = validateForm(userID,firstName,lastName,formName)
                const storeValidSSD  = validateSSD(employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,incidentPlace)
                
                //const returnObject = {userID,firstName,lastName,formName,employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum}
                console.log("validation 1" , storeValidForm?.[2])
                if(!storeValidForm?.[0]) return res.status(storeValidForm?.[1]).json({message: storeValidForm?.[2]})
                
                console.log("validation 2" , storeValidSSD?.[2])
                if(!storeValidSSD?.[0]) return res.status(storeValidSSD?.[1]).json({message: storeValidSSD?.[2]})
                

                const sqlInsertBaseForm = "INSERT INTO Form (userID,firstName,lastName,formName) VALUES (?,?,?,?)"
                const sqlInsertSSD = "INSERT INTO SSD (formID,employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,incidentPlace) VALUES (?,?,?,?,?,?,?,?,?,?)"
                const sqlFetchForm = "SELECT id FROM Form WHERE userID = ? AND firstName = ? AND lastName = ? AND formName = ? ORDER BY id DESC LIMIT 1"
                const sqlFetchAllInfos = "SELECT * FROM Form JOIN SSD ON Form.id = SSD.formID WHERE Form.id = ? LIMIT 1"

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                                ]
                                                           )

                const formIDFetch = await pool.query(sqlFetchForm, [userID, firstName, lastName, formName])

                let formID = formIDFetch[0]?.[0]?.id

                const storeSSDQuery = await pool.query(sqlInsertSSD, [
                                                                        formID,
                                                                        employeeCode,
                                                                        fonctionWhenHappend,
                                                                        activityCenter,
                                                                        incidentDate,
                                                                        incidentHour,
                                                                        witnesses,
                                                                        incidentDescription,
                                                                        correctionsOrAddOn,
                                                                        incidentPlace 
                                                                     ]
                                                      )

                const returnFormObject = await pool.query(sqlFetchAllInfos,formID)

                const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
                const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"
                

                let superiorEmail, superiorName 

                const adminName = process.env.ADMIN_NAME
                const adminEmail = process.env.ADMIN_EMAIL

                const getSuperiorID = await pool.query(fetchUserSuperior, userID)
                console.log("iciiiii" , getSuperiorID[0][0]?.superior)
                if(getSuperiorID[0][0]?.superior){
                        const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)

                        superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
                        superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email
                }


                // send notification mail
                if (storeBaseFormQuery && storeSSDQuery ){
                        const recipients = [{ Email: adminEmail, Name: adminName }]
                        if(getSuperiorID[0][0]?.superior){
                                recipients.push({ Email: superiorEmail, Name: superiorName })
                        }
                  //sendMailNotification(recipients)
                }


                res.status(201).json(returnFormObject[0][0])

                console.log("On a une réponse")
                 

        }catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})

        }
}


export const fetchAllResponse = async (req,res) => {

        try{

                const query = "SELECT * FROM Form LEFT JOIN IncidentReport ON Form.id = IncidentReport.formID LEFT JOIN SSD ON Form.id = SSD.formID LEFT JOIN WorkingAccidentReport ON Form.id = WorkingAccidentReport.formID LEFT JOIN AuditSST ON Form.id = AuditSST.formID"
                
                const responses = await pool.query(query)

                console.log(responses)


                res.status(201).json(responses?.[0])

        }catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})       
        }


}


export const fetchMyResponse = async (req,res) => {
        try{

                const {userID} = req.body


                const sqlFetchMyResponse = "SELECT * FROM Form LEFT JOIN IncidentReport ON Form.id = IncidentReport.formID LEFT JOIN SSD ON Form.id = SSD.formID LEFT JOIN WorkingAccidentReport ON Form.id = WorkingAccidentReport.formID LEFT JOIN AuditSST ON Form.id = AuditSST.formID WHERE Form.userID = ?"

                const myRespones = await pool.query(sqlFetchMyResponse, userID)

                console.log(myRespones)
                res.status(201).json(myRespones?.[0])


        }catch(error){

                console.log(error)
        }
}


export const fetchEmployeeResponse = async (req,res) => {
        try{

                const {userID} = req.body

                const sqlFetchEmployeeResponse  = "SELECT * FROM Form LEFT JOIN IncidentReport ON Form.id = IncidentReport.formID LEFT JOIN SSD ON Form.id = SSD.formID LEFT JOIN WorkingAccidentReport ON Form.id = WorkingAccidentReport.formID LEFT JOIN AuditSST ON Form.id = AuditSST.formID WHERE Form.userID IN (SELECT id FROM user WHERE superior = ?)"

                const employeeResponses = await pool.query(sqlFetchEmployeeResponse,userID)


                console.log(employeeResponses)

                res.status(201).json(employeeResponses?.[0])

        }catch(error){
                console.log(error)
        }
}

export const updateReadStatus = async (req,res) => {

        try{
                let Today = new Date()

                const { id,
                        userID,
                        accessLevel} = req.body

                if(accessLevel === 2) {

                        const sqlUpdateReadStatusSupervisor = "UPDATE Form SET isReadSupervisor = true, readBySupervisor = ?, readOnSupervisor = ? WHERE id = ?"

                        const updateReadStatusSupervisor = await pool.query(sqlUpdateReadStatusSupervisor,[userID,Today,id])
                }
                
                if (accessLevel === 3){

                        const sqlUpdateReadStatusAdmin = "UPDATE Form SET isReadAdmin = true, readByAdmin = ?, readOnAdmin = ? WHERE id = ?"

                        const updateReadStatusAdmin = await pool.query(sqlUpdateReadStatusAdmin,[userID,Today,id])
                }


                const fetchUserSuperior = "SELECT superior from USER WHERE id = ?"
                const superiorInfo = "SELECT email, firstName, lastName FROM USER WHERE id = ?"
                

                let superiorEmail, superiorName 

                const adminName = process.env.ADMIN_NAME
                const adminEmail = process.env.ADMIN_EMAIL

                const getSuperiorID = await pool.query(fetchUserSuperior, userID)
                console.log("iciiiii" , getSuperiorID[0][0]?.superior)
                if(getSuperiorID[0][0]?.superior){
                        const storeSuperiorInfo = await pool.query(superiorInfo, getSuperiorID[0][0]?.superior)

                        superiorName = storeSuperiorInfo?.[0]?.[0]?.firstName + " " + storeSuperiorInfo?.[0]?.[0]?.lastName
                        superiorEmail = storeSuperiorInfo?.[0]?.[0]?.email
                }


                // send notification mail
                const recipients = [{ Email: adminEmail, Name: adminName }]
                if(getSuperiorID[0][0]?.superior){
                        recipients.push({ Email: superiorEmail, Name: superiorName })
                }
                //sendMailNotification(recipients)


                let targetedUser, triggeredBy, typeNotif

                if(getSuperiorID[0][0]?.superior){
                        targetedUser = getSuperiorID[0][0]?.superior
                }


                triggeredBy = userID
                typeNotif = 2
                
                sendNotification(targetedUser, triggeredBy, typeNotif, formID)

                const sqlFetchForm = "SELECT * FROM Form WHERE id = ? LIMIT 1"

                const form = await pool.query(sqlFetchForm,id)

                res.status(201).json(form?.[0])

        }catch(error){
                console.log(error)
        }
}
