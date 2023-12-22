export const dateFormat = () => {  
let dateActuelle = new Date(); // Obtenez la date actuelle

// Obtenez les composants de la date
let jour = dateActuelle.getDate();
let mois = dateActuelle.getMonth() + 1; // Les mois commencent à partir de 0 (janvier)
let annee = dateActuelle.getFullYear();

// Assurez-vous que les composants soient sur deux chiffres (par exemple, 01 pour janvier)
if (mois < 10) {
    mois = '0' + mois;
}
if (jour < 10) {
    jour = '0' + jour;
}

// Formatage de la date au format souhaité (par exemple, 'YYYY-MM-DD')
let dateFormatee = `${annee}-${mois}-${jour}`;

return dateFormatee;

}
