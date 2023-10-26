
import pool from "../config/db.config.js"
import { validateAudiSST, validateForm , validateIncidentReport , validateWorkingAccidentReport , validateSSD } from "../utilities/request/request.js"
import { sendMailNotification } from "../utilities/mailjet/mailjet.js"


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


                   const superiorName = superior
                // const superiorEmail = "SELECT email ....... "   BESOIN DU EMAIL DU SUPÉRIEUR POUR ENVOYER LE MAIL
                // const adminName = "SELECT name ....... "    BESOIN DU NOM DE L'ADMIN POUR ENVOYER LE MAIL
                // const adminEmail = "SELECT email ....... "   BESOIN DU EMAIL DU ADMIN POUR ENVOYER LE MAIL
              
                // send notification mail
                if (storeBaseFormQuery && storeAuditSSTQuery ){
                  //sendMailNotification(superiorName, superiorEmail, adminName, adminEmail)
                }

    
        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }
    
   
}


export const storeIncidentReportResponse = async (req, res) => {
        try{
                const {
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
                const sqlInsertIncidentReport = "INSERT INTO IncidentReport (formID,unitsInvolved,departement,superior,driverLicense) VALUES (?,?,?,?,?)"
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


export const storeWorkingAccidentReport = async (req, res) => {

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
                        superiorPostNum,
                        workerPostNum } = req.body

                const storeValidForm = validateForm(id,userID,firstName,lastName,formName)
                const storeValidWorkingAccidentReport = validateWorkingAccidentReport(employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum,workerPostNum)
                

                if(!storeValidForm?.[0]) return res.status(v?.[1]).json({message: v?.[2]})
                if(!storeValidWorkingAccidentReport?.[0]) return res.status(v?.[1]).json({ message: v?.[2] })
                

                const sqlInsertBaseForm = "INSERT INTO Form (id,userID,firstName,lastName,formName) VALUES (?,?,?,?,?)"
                const sqlInsertWorkingAccidentReport = "INSERT INTO WorkingAccidentReport (formID,employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum,workerPostNum) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" 
                const returnObject = {id,userID,firstName,lastName,formName,employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum,workerPostNum}

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                id,
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                                ]
                                                        )

                const storeWorkingAccidentReportQuery = await pool.query(sqlInsertWorkingAccidentReport, [
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
                                                                                                        superiorPostNum,
                                                                                                        workerPostNum      
                                                                                                        ]
                                                                        )
        
                res.status(201).json(returnObject) // à voir si on fetch pas la bd à la place.        

        }
        catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})
        }

}


export const storeSSD = async (req,res) => {
        try{

                const {
                        id,
                        userID,
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
                        superiorIsAdvised,
                        superior,
                        superiorAdvisedOn,
                        superiorPostNum} = req.body
                
                const storeValidForm = validateForm(id,userID,firstName,lastName,formName)
                const storeValidSSD  = validateSSD(employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum)
                
                const returnObject = {id,userID,firstName,lastName,formName,employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum}

                if(!storeValidForm?.[0]) return res.status(v?.[1]).json({message: v?.[2]})
                if(!storeValidSSD?.[0]) return res.status(v?.[1]).json({message: v?.[2]})

                const sqlInsertBaseForm = "INSERT INTO Form (id,userID,firstName,lastName,formName) VALUES (?,?,?,?,?)"
                const sqlInsertSSD = "INSERT INTO Form (formID,employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
                

                const storeBaseFormQuery = await pool.query(sqlInsertBaseForm, [
                                                                                id,
                                                                                userID,
                                                                                firstName,
                                                                                lastName,
                                                                                formName
                                                                                ]
                                                           )
                const storeSDDQuery = await pool.query(sqlInsertSSD, [
                                                                        employeeCode,
                                                                        fonctionWhenHappend,
                                                                        activityCenter,
                                                                        incidentDate,
                                                                        incidentHour,
                                                                        witnesses,
                                                                        incidentDescription,
                                                                        correctionsOrAddOn,
                                                                        superiorIsAdvised,
                                                                        superior,
                                                                        superiorAdvisedOn,
                                                                        superiorPostNum 
                                                                     ]
                                                      )
                
                res.status(201).json(returnObject) // à voir si on fetch pas la bd à la place.  

        }catch(error){
                console.log(error)
                res.status(500).json({message : 'Erreur du serveur'})

        }
}