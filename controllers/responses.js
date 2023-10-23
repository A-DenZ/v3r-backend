import { response } from "express"
import { validateAudiSST } from "../utilities/request/request"
import { sendMailNotification } from "../utilities/mailjet/mailjet"


export const storeAudiResponse = async (req, res) => {
        try {

                const { id,
                        userID,
                        firstName,
                        lastName,
                        formName,
                        creationDate, // BOF
                        modificationDate, // BOF
                        readOn, // BOF
                        isRead, // BOF
                        readBy, // BOF
                        isOpen, // BOF
                        openedBy, // BOF
                        openedOn, // BOF

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
                        procedureRespect,
                        incidentDescription,

                        superior } = req.body
                
                const storeValidForm = validateForm(id,userID,firstName,lastName,formName)
                const storeValidAuditSST = validateAudiSST(incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod, others, distanceRespected, EPIAreOn, procedureRespect, incidentDescription) // returns array conataining [boolean, status, message]

                if(!storeValidForm?.[0]) return res.status(v?.[1]).json({message: v?.[2]})
                if(!storeValidAuditSST?.[0]) return res.status(v?.[1]).json({ message: v?.[2] })
                
                const returnObject = {id,userID,firstName,lastName,formName,incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod, others, distanceRespected, EPIAreOn, procedureRespect, incidentDescription}
                const sqlInsertBaseForm = "INSERT INTO Form (id,userID,firstName,lastName,formName) VALUES (?,?,?,?,?)"
                const sqlInsertAuditSST = "INSERT INTO AuditSST (formID, incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod, others, distanceRespected, EPIAreOn, procedureRespect, incidentDescription) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                
                
                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                id,
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                               ]
                                                           )
                const storeAuditSSTQuery = await pool.query(sqlInsertAuditSST, 
                                                               [
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
                                                                procedureRespect,
                                                                incidentDescription
                                                               ]
                                                           )
                

                res.status(201).json(returnObject)


                   const superiorName = superior
                // const superiorEmail = "SELECT email ....... "   BESOIN DU EMAIL DU SUPÉRIEUR POUR ENVOYER LE MAIL
                // const adminName = "SELECT name ....... "    BESOIN DU NOM DE L'ADMIN POUR ENVOYER LE MAIL
                // const adminEmail = "SELECT email ....... "   BESOIN DU EMAIL DU ADMIN POUR ENVOYER LE MAIL
              
                // send notification mail
                if (storeBaseFormQuery && storeAuditSSTQuery ){
                  sendMailNotification(firstName = superiorName, 
                                       firstMail = superiorEmail,
                                       secondName = adminName, 
                                       secondMail = adminEmail)
                }
        
    
        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
    
   
} 