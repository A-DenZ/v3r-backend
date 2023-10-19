import { response } from "express"
import { validateAudiSST } from "../utilities/request/request"

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
                        incidentDescription } = req.body
                
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
    
        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
    
   
} 