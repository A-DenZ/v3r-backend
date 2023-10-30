import { defaultInputFilter , numberFilter, driverLicenseFilter, dateFilter, hourFilter } from "../regexp/regexp.js"

export const validateForm = (userID,firstName,lastName,formName) => {
    let isValid = true
    let validStatus = 200
    let invalidStatus = 400
    let okMessage = "Le formulaire à été correctement validé.";
    let blockMessage = "Une erreur de saisie bloque l'envoi du formulaire."


    if(!numberFilter.test(userID) || userID == "" || userID == null){ // à ajuster peux-être
        isValid = false
        console.log("userID")
    }

    // PROTECTION CONTRE L'INJECTION SQL ET L'INJECTION DE SCRIPT

    if(defaultInputFilter.test(firstName) || firstName == "" || firstName == null){
        isValid = false
        console.log("first")
    }

    if(defaultInputFilter.test(lastName) || lastName == "" || lastName == null ){
        isValid = false
        console.log("last")
    }

    if (formName !== "SSD" && formName !== "AuditSST" && formName !== "WorkingAccidentReport" && formName !== "IncidentReport") {
        isValid = false;
        console.log("formName");
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



    if (defaultInputFilter.test(incidentPlace) || incidentPlace == ""  || incidentPlace == null) {
        isValid = false;
        console.log("1" , incidentPlace)
    }

    if (!dateFilter.test(incidentDate) || incidentDate == "" || incidentDate == null) {
        isValid = false;
        console.log("2" , incidentDate)
    }

    if (!hourFilter.test(incidentHour) || incidentHour == "" || incidentHour == null) {
        isValid = false;
        console.log("3" , incidentHour)
    }
    
    if (!(EPI === "Conforme" || EPI === "Non conforme" || EPI === "N/A" || EPI === "" || EPI === null)) {
        isValid = false;
        console.log("4", EPI);
    }
    
    if (!(placeConform === "Conforme" || placeConform === "Non conforme" || placeConform === "N/A" || placeConform === "" || placeConform === null)) {
        isValid = false;
        console.log("5", placeConform);
    }
    
    if (!(safeComportement === "Conforme" || safeComportement === "Non conforme" || safeComportement === "N/A" || safeComportement === "" || safeComportement === null)) {
        isValid = false;
        console.log("6", safeComportement);
    }
    
    if (!(signalytics === "Conforme" || signalytics === "Non conforme" || signalytics === "N/A" || signalytics === "" || signalytics === null)) {
        isValid = false;
        console.log("7", signalytics);
    }
    
    if (!(signalyticsSheets === "Conforme" || signalyticsSheets === "Non conforme" || signalyticsSheets === "N/A" || signalyticsSheets === "" || signalyticsSheets === null)) {
        isValid = false;
        console.log("8", signalyticsSheets);
    }
    
    if (!(workingExcavation === "Conforme" || workingExcavation === "Non conforme" || workingExcavation === "N/A" || workingExcavation === "" || workingExcavation === null)) {
        isValid = false;
        console.log("9", workingExcavation);
    }
    
    if (!(confinedSpace === "Conforme" || confinedSpace === "Non conforme" || confinedSpace === "N/A" || confinedSpace === "" || confinedSpace === null)) {
        isValid = false;
        console.log("10", confinedSpace);
    }
    
    if (!(workingMethod === "Conforme" || workingMethod === "Non conforme" || workingMethod === "N/A" || workingMethod === "" || workingMethod === null)) {
        isValid = false;
        console.log("11", workingMethod);
    }
    
    if (!(distanceRespected === "Conforme" || distanceRespected === "Non conforme" || distanceRespected === "N/A" || distanceRespected === "" || distanceRespected === null)) {
        isValid = false;
        console.log("12", distanceRespected);
    }
    
    if (!(EPIAreOn === "Conforme" || EPIAreOn === "Non conforme" || EPIAreOn === "N/A" || EPIAreOn === "" || EPIAreOn === null)) {
        isValid = false;
        console.log("13", EPIAreOn);
    }
    
    if (!(procedureRespect === "Conforme" || procedureRespect === "Non conforme" || procedureRespect === "N/A" || procedureRespect === "" || procedureRespect === null)) {
        isValid = false;
        console.log("14", procedureRespect);
    }
    

    // PROTECTION CONTRE L'INJECTION SQL ET L'INJECTION DE SCRIPT
    if(defaultInputFilter.test(incidentDescription) || incidentDescription == "" || incidentDescription == null) {
        isValid = false;
        console.log("15" , incidentDescription)
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


export const validateWorkingAccidentReport = (employeeCode,fonctionWhenHappend,accidentDate,accidentHour,witnesses,accidentPlace,activityCenter,injuries,injuriesDescription,physicalViolence,verbalViolence,accidentDescription,firstAid,secouristName,medicalConsultation,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum,workerPostNum) => {

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

    if(!hourFilter.test(accidentHour) || accidentHour == "" || accidentHour == null){
        isValid = false
    }

    if(defaultInputFilter.test(witnesses) || witnesses == "" || witnesses == null){
        isValid = false
    }

    if(defaultInputFilter.test(accidentPlace) || accidentPlace == "" || accidentPlace == null){
        isValid = false
    }

    if(defaultInputFilter.test(activityCenter) || activityCenter == "" || activityCenter == null){
        isValid = false
    }

    if(defaultInputFilter.test(injuries) || injuries == "" || injuries == null){
        isValid = false
    }

    if(defaultInputFilter.test(injuriesDescription) || injuriesDescription == "" || injuriesDescription == null){
        isValid = false
    }

    if(physicalViolence == null){
        isValid = false
    }

    if(verbalViolence == null){
        isValid = false
    }

    if(defaultInputFilter.test(accidentDescription) || accidentDescription == "" || accidentDescription == null){
        isValid = false
    }

    if(defaultInputFilter.test(firstAid) || firstAid == "" || firstAid == null){
        isValid = false
    }

    if(defaultInputFilter.test(secouristName) || secouristName == "" || secouristName == null){
        isValid = false
    }

    if(medicalConsultation == null){
        isValid = false
    }

    if(superiorIsAdvised == null){
        isValid = false
    }
    
    if(defaultInputFilter.test(superior) || superior == "" || superior == null){ // à voir si il y a un supérieur ou non
        isValid = false
    }

    if(!dateFilter.test(superiorAdvisedOn) || superiorAdvisedOn == "" || superiorAdvisedOn == null){
        isValid = false
    }

    if(!numberFilter.test(superiorPostNum) || superiorPostNum == "" || superiorPostNum == null){
        isValid = false
    }

    if(!numberFilter.test(workerPostNum) || workerPostNum == "" || workerPostNum == null){
        isValid = false
    }


    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }


}

export const validateSSD = (employeeCode,fonctionWhenHappend,activityCenter,incidentDate,incidentHour,witnesses,incidentDescription,correctionsOrAddOn,superiorIsAdvised,superior,superiorAdvisedOn,superiorPostNum) => {

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

    if(!dateFilter.test(incidentDate) || incidentDate == "" || accidentDate == null){
        isValid = false
    }

    if(!hourFilter.test(incidentHour) || incidentHour == "" || accidentHour == null){
        isValid = false
    }

    if(defaultInputFilter.test(witnesses) || witnesses == "" || witnesses == null){
        isValid = false
    }

    if(defaultInputFilter.test(accidentPlace) || accidentPlace == "" || accidentPlace == null){
        isValid = false
    }

    if(defaultInputFilter.test(activityCenter) || activityCenter == "" || activityCenter == null){
        isValid = false
    }

    if(defaultInputFilter.test(incidentDescription) || incidentDescription == "" || incidentDescription == null){
        isValid = false
    }

    if(defaultInputFilter.test(correctionsOrAddOn) || correctionsOrAddOn == "" || correctionsOrAddOn == null){
        isValid = false
    }

    if(superiorIsAdvised == null){
        isValid = false
    }
    
    if(defaultInputFilter.test(superior) || superior == "" || superior == null){ // à voir si il y a un supérieur ou non
        isValid = false
    }

    if(!dateFilter.test(superiorAdvisedOn) || superiorAdvisedOn == "" || superiorAdvisedOn == null){
        isValid = false
    }

    if(!numberFilter.test(superiorPostNum) || superiorPostNum == "" || superiorPostNum == null){
        isValid = false
    }

    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }

}