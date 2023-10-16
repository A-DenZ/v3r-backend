import { defaultInputFilter } from "../regexp/regexp"
export const validateForm = (id,userID,firstName,lastName,formName) => {
    
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

    if(defaultInputFilter.test(incidentDescription)) {
        isValid = false;
    } // PROTECTION CONTRE L'INJECTION SQL ET L'INJECTION DE SCRIPT


    if(isValid) {
        return [true, validStatus , okMessage]
    }
    else{
        return [false, invalidStatus, blockMessage]
    }

}