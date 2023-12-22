export const compterElementsParMois = (tableau) => {
    const compteurParMois = {};

    // Parcourir le tableau d'éléments
    tableau.forEach(element => {
        const mois = element.creationDate.getMonth() + 1; // Les mois sont indexés à partir de 0 (janvier = 0, février = 1, etc.)

        // Vérifier si le mois existe dans le compteur, sinon initialiser à 1
        if (!compteurParMois[mois]) {
            compteurParMois[mois] = 1;
        } else {
            compteurParMois[mois]++;
        }
    });

    return compteurParMois;
}


