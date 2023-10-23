import { defaultInputFilter , numberFilter, driverLicenseFilter, dateFilter } from "../regexp/regexp"

export const validateForm = (id,userID,firstName,lastName,formName) => {
    let isValid = true
    let validStatus = 200
    let invalidStatus = 400
    let okMessage = "Le formulaire à été correctement validé.";
    let blockMessage = "Une erreur de saisie bloque l'envoi du formulaire."

    if(!numberFilter.test(id)){ // à ajuster peux-être
        isValid = false
    }

    if(!numberFilter.test(userID)){ // à ajuster peux-être
        isValid = false
    }

    // PROTECTION CONTRE L'INJECTION SQL ET L'INJECTION DE SCRIPT

    if(defaultInputFilter.test(firstName) || firstName == "" || firstName == null){
        isValid = false
    }

    if(defaultInputFilter.test(lastName) || lastName == "" || lastName == null ){
        isValid = false
    }

    if(formName !== "SSD" || formName !== "AuditSST" || formName !== "WorkingAccidentReport" || formName !== "IncidentReport"){
        isValid = false
    }
    
    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }
    

}

export const validateAudiSST = (incidentPlace, incidentDate, incidentHour, EPI, placeConform, safeComportement, signalytics, signalyticsSheets, workingExcavation, confinedSpace, workingMethod, others, distanceRespected, EPIAreOn, procedureRespect, incidentDescription) => {
    let isValid = true
    let validStatus = 200
    let invalidStatus = 400
    let okMessage = "Le formulaire à été correctement validé.";
    let blockMessage = "Une erreur de saisie bloque l'envoi du formulaire."
    
    
    // SPECIFICITÉ POUR OTHERS



    if (incidentPlace !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (incidentDate !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (incidentHour !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (EPI !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (placeConform !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (safeComportement !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (signalytics !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (signalyticsSheets !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (workingExcavation !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (confinedSpace !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (workingMethod !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (distanceRespected !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (EPIAreOn !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    if (procedureRespect !== "Conforme" || incidentPlace !== "Non conforme" || incidentPlace !== "N/A") {
        isValid = false;
    }

    // PROTECTION CONTRE L'INJECTION SQL ET L'INJECTION DE SCRIPT
    if(defaultInputFilter.test(incidentDescription) || incidentDescription == "" || incidentDescription == null) {
        isValid = false;
    } 


    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }

}

export const validateIncidentReport = (unitsInvolved,departement,superior,driverLicense) => {

    let isValid = true
    let validStatus = 200
    let invalidStatus = 400
    let okMessage = "Le formulaire à été correctement validé.";
    let blockMessage = "Une erreur de saisie bloque l'envoi du formulaire."

    if(!numberFilter.test(unitsInvolved) || unitsInvolved == "" || unitsInvolved == null) {
        isValid = false
    }

    if(defaultInputFilter.test(departement) || departement == "" || departement == null){
        isValid = false
    }

    if(defaultInputFilter.test(superior) || superior == "" || departement == null){
        isValid = false
    }

    if(!driverLicenseFilter.test(driverLicense) || driverLicense == "" || driverLicense == null){
        isValid = false
    }


    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }



}


export const validateWorkingAccidentReport = (employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorSignature,superiorSignatureDate,superiorPostNum,workerSignature,workerSignatureDate,workerPostNum) => {

    let isValid = true
    let validStatus = 200
    let invalidStatus = 400
    let okMessage = "Le formulaire à été correctement validé.";
    let blockMessage = "Une erreur de saisie bloque l'envoi du formulaire."

    if(defaultInputFilter.test(employeeCode) || employeeCode == "" || fonctionWhenHappend == null){
        isValid = false
    }

    if(defaultInputFilter.test(fonctionWhenHappend) || fonctionWhenHappend == "" || fonctionWhenHappend == null){
        isValid = false
    }

    if(!dateFilter.test(accidentDate) || accidentDate == "" || accidentDate == null){
        isValid = false
    }

    





}