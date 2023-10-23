import pool from "../config/db.config.js"
import { validateAudiSST, validateForm , validateIncidentReport } from "../utilities/request/request"

export const storeAuditSSTResponse = async (req, res) => {
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
                                                                id,
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
                

                res.status(201).json(returnObject) // à voir si on fetch pas la bd à la place.
    
        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
    
   
}


export const storeIncidentReportResponse = async (req, res) => {
        try{
                const { id,
                        userID,
                        firstName,
                        lastName,
                        formName,

                        unitsInvolved,
                        departement,
                        superior,
                        driverLicense } = req.body
                        
                
                
                const storeValidForm = validateForm(id,userID,firstName,lastName,formName)
                const storeValidIncidentReport = validateIncidentReport(unitsInvolved,departement,superior,driverLicense)         
                
                if(!storeValidForm?.[0]) return res.status(v?.[1]).json({message: v?.[2]})
                if(!storeValidIncidentReport?.[0]) return res.status(v?.[1]).json({ message: v?.[2] })

                const sqlInsertBaseForm = "INSERT INTO Form (id,userID,firstName,lastName,formName) VALUES (?,?,?,?,?)"
                const sqlInsertIncidentReport = "INSERT INTO (formID,unitsInvolved,departement,superior,driverLicense) VALUES (?,?,?,?,?)"
                const returnObject = {id,userID,firstName,lastName,formName,unitsInvolved,departement,superior,driverLicense}

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                id,
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                               ]
                                                            )

                const storeIncidentReport = await pool.query(sqlInsertIncidentReport, [
                                                                                        id,
                                                                                        unitsInvolved,
                                                                                        departement,
                                                                                        superior,
                                                                                        driverLicense
                                                                                      ]
                                                            )


                res.status(201).json(returnObject) // à voir si on fetch pas la bd à la place.

        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
}


export const WorkingAccidentReport = async (req, res) =>{

        try{

                const { id,
                        userID,
                        firstName,
                        lastName,
                        formName,

                        employeeCode,
                        fonctionWhenHappend,
                        accidentDate,
                        accidentHour,
                        witnesses,
                        accidentPlace,
                        activityCenter,
                        injuries,
                        injuriesDescription,
                        physicalViolence,
                        verbalViolence,
                        accidentDescription,
                        firstAid,
                        secouristName,
                        medicalConsultation,
                        superiorIsAdvised,
                        superior,
                        superiorAdvisedOn,
                        superiorSignature,
                        superiorSignatureDate,
                        superiorPostNum,
                        workerSignature,
                        workerSignatureDate,
                        workerPostNum } = req.body

                const storeValidForm = validateForm(id,userID,firstName,lastName,formName)
                const storeValidWorkingAccidentReport = validateWorkingAccidentReport(employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorSignature,superiorSignatureDate,superiorPostNum,workerSignature,workerSignatureDate,workerPostNum)

        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }

}