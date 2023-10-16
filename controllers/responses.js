import { validateAudiSST } from "../utilities/request/request"

export const storeAudiResponse = async (req, res) => {
    
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

    if (!storeValidAuditSST?.[0]) return res.status(v?.[1]).json({ message: v?.[2] })


    
   // STORE  const [rows] = await pool.query("SELECT AccessLevel, email, employeeCode, firstName, id, lastName, position, superior FROM `user`");
} 