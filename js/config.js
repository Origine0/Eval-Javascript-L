document.addEventListener('DOMContentLoaded', function () {
    const ecrans = document.querySelectorAll("div[id^=ecran"); //Vive les css selectors !!!
    const boutonsOK = document.querySelectorAll("button[id^=btEcran]");
    const boutonsRetour= document.querySelectorAll("button[id^=btRetour]");
    const forfaitsPageUn = ecrans[0].getElementsByClassName('card');
    const nombreAnnoncePageDeux = document.getElementById('inputNb');
    const optionsPageTrois = ecrans[2].getElementsByClassName('card');
    const recapOptionsPageQuatre = document.querySelectorAll("div[id^=recapOption]");
    let forfaitDejaChoisiPageUn = '';
    let prixForfaitDejaChoisi = '';
    let nombreAnnonceSouhaite = 0;
    let optionsDejaChoisiPageTrois = [];
    let prixParAnnonce = 0;
    let prixOption = 0;

    let numEcranCourant = 1;

    updateEcranCourant();

    function clearEcrans(){    
        for (const ecran of ecrans){
            ecran.classList.add('hidden');
        }
    }

    function updateEcranCourant(){
        clearEcrans();
        const ecranCourantDiv = document.getElementById('ecran'+numEcranCourant);
        ecranCourantDiv.classList.remove('hidden');
    }

    function clearBackgroundForfaitSaufActif(nomForfaitChoisi){
        for (const forfait of forfaitsPageUn){
            if (forfait.querySelector('h3').innerText == nomForfaitChoisi){
            } else {
                forfait.style.backgroundColor = 'transparent';
            }
        }
    }

    //Boutons OK
    for (const bouton of boutonsOK){
        bouton.addEventListener('click', () => {
            numEcranCourant += 1;

            //Pas nécessaire mais c'est pour éviter que le programme plante
            if (numEcranCourant > ecrans.length){
                numEcranCourant = ecrans.length
            }

            updateEcranCourant();
        });
    }

    //Boutons Retour
    for (const bouton of boutonsRetour){
        bouton.addEventListener('click', () => {
            numEcranCourant -= 1;

            //Pas nécessaire mais c'est pour éviter que le programme plante
            if (numEcranCourant < 1 ){
                numEcranCourant = 1;
            }
            updateEcranCourant();

        });
    }

    //Fonctionnalités page 1
    boutonsOK[0].disabled = true; 
    for (const forfait of forfaitsPageUn){
        forfait.addEventListener('click', () => {

            nomForfaitChoisi = forfait.querySelector('h3').innerText;

            clearBackgroundForfaitSaufActif(nomForfaitChoisi);

            //Activation d'un forfait
            if (forfait.style.backgroundColor != 'red'){
                forfait.style.backgroundColor = 'red';
                boutonsOK[0].disabled = false;  

            }
            //Desactivation du même forfait
            else if (forfait.style.backgroundColor == 'red') {
                forfait.style.backgroundColor = 'transparent';
                boutonsOK[0].disabled = true;  
            }

            prixForfaitDejaChoisi = forfait.querySelector('td:first-child').childNodes[0].nodeValue.trim();
            forfaitDejaChoisiPageUn = nomForfaitChoisi;


            //Pour la page 4 (recap)
            document.getElementById('recapDuree').innerText = forfaitDejaChoisiPageUn
            document.getElementById('recapDuree2').innerText = forfaitDejaChoisiPageUn
            
            document.getElementById('recapPrix').innerText = prixForfaitDejaChoisi;

        });
    }

    //Fonctionnalités page 2
    boutonsOK[1].disabled = true;
    if (nombreAnnoncePageDeux.value > 0){
        nombreAnnonceSouhaite = nombreAnnoncePageDeux.value;
        document.getElementById('recapQuantite').innerText = nombreAnnoncePageDeux.value
        document.getElementById('finalQuantite').innerText = nombreAnnoncePageDeux.value
        prixParAnnonce = parseFloat(prixForfaitDejaChoisi.slice(0,-1).replace(/,/g, ".")); //On enléve le € et on remplace le , par . pour le parseFloat
    } else {
        boutonsOK[1].disabled = true;
    }
    
    nombreAnnoncePageDeux.addEventListener('input', () => {
        if(nombreAnnoncePageDeux.value > 0){
            boutonsOK[1].disabled = false;
        } else {
            boutonsOK[1].disabled = true;
        }
        nombreAnnonceSouhaite = nombreAnnoncePageDeux.value;
        document.getElementById('recapQuantite').innerText = nombreAnnoncePageDeux.value
        document.getElementById('finalQuantite').innerText = nombreAnnoncePageDeux.value
        

        prixParAnnonce = parseFloat(prixForfaitDejaChoisi.slice(0,-1).replace(/,/g, ".")); //On enléve le € et on remplace le , par . pour le parseFloat
        document.getElementById('prixTotal').innerText = nombreAnnonceSouhaite * prixParAnnonce
    });

    //Fonctionnalités page 3
    for (const option of optionsPageTrois){
        option.addEventListener('click', () => {

            nomOptionChoisi = option.querySelector('h3').innerText;


            //Activation d'une option
            if (option.style.backgroundColor != 'red'){
                option.style.backgroundColor = 'red';
                optionsDejaChoisiPageTrois.push(nomOptionChoisi);
                prixOption = option.querySelector('h4').innerText;
                prixOption = parseFloat(prixOption.slice(0,4).replace(/,/g, ".")); //On enléve le € et on remplace le , par . pour le parseFloat
                document.getElementById('optionsRecapFinal').innerText = 'Option(s): ' + optionsDejaChoisiPageTrois.join(",")
                document.getElementById('prixTotal').innerText = (nombreAnnonceSouhaite * prixParAnnonce) + prixOption
            }
            //Desactivation de la même option
            else if (option.style.backgroundColor == 'red') {
                option.style.backgroundColor = 'transparent';
                optionsDejaChoisiPageTrois.pop(nomOptionChoisi);
            }

            //Dans le cas où on a sélectionné les deux options
            if (optionsDejaChoisiPageTrois.length == 2){
                premiereOption = optionsPageTrois[0];
                deuxiemeOption = optionsPageTrois[1];
                premiereOption.style.backgroundColor = 'transparent';
                deuxiemeOption.style.backgroundColor = 'transparent';
                optionsDejaChoisiPageTrois.pop(premiereOption.querySelector('h3').innerText);
                optionsDejaChoisiPageTrois.pop(deuxiemeOption.querySelector('h3').innerText);

                troisiemeOption = optionsPageTrois[2];
                troisiemeOption.style.backgroundColor = 'red';
                optionsDejaChoisiPageTrois.push(troisiemeOption.querySelector('h3').innerText)
                document.getElementById('optionsRecapFinal').innerText = 'Option(s): ' + optionsDejaChoisiPageTrois.join(",")
                document.getElementById('prixTotal').innerText = nombreAnnonceSouhaite * prixParAnnonce + prixOption
            }

            //Fonctionnalités page 4
            for (const recapOption of recapOptionsPageQuatre){
                recapOption.style.display = 'none';
                if(optionsDejaChoisiPageTrois.includes(recapOption.querySelector('h3').textContent)){
                    recapOption.style.display = 'block';
                }
            }
        });
    }

    //Cacher par défaut le recap des options pour la page quatre
    for (const recapOption of recapOptionsPageQuatre){
        recapOption.style.display = 'none';
    }
});