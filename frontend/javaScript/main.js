import {sendXHR}  from './sendXHR.js'
import {updatePanierHeader}  from  './updatePanierHeader.js'


async function afficherProduits(responseData) {  
    let vitrine = document.querySelector('#vitrine');
    responseData.forEach(article => {
        vitrine.innerHTML += `
                    <div class="jumbotron d-flex flex-column flex-md-row articles">
                       <div class="flex-fill">
                          <a href="./produit.html?id=${article._id}" >
                              <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                   class="img-thumbnail mx-auto d-block">
                          </a>
                        </div>
                        <div class="flex-fill mx-auto text-center">
                            <h2 class="mb-4 mt-4 display-4"> ${article.name} </h2>
                            <p>${article.description}</p> 
                            <h4>&Agrave partir de ${article.price/100}€</h4>
                            <a id=${article._id} class="btn btn-info mt-4" href="./produit.html?id=${article._id}">Découvrez nos modèles</a>
                        </div>
                    </div> `;
        return vitrine;
    });
}


async function imageOpacity () {  // Animation & style des images 'mouseover'
    let imageAffiche = document.querySelectorAll('img');
    for(let i = 0 ; i < imageAffiche.length ; i++) {
        imageAffiche[i].addEventListener('mouseover', function() {
            this.style.opacity ='0.75'
            this.style.scale ='1.1'
            this.style.transition ='all 350ms'
        });
        imageAffiche[i].addEventListener('mouseout', function() {
            this.style.opacity ='1'
            this.style.scale ='1'
        });
    }
}


document.addEventListener("DOMContentLoaded", () => { // affichage vitrine au chargement terminé
    sendXHR('GET', 'http://localhost:3000/api/cameras')
        .then(infoProduits => afficherProduits(infoProduits) ,
              errorResponseData => {
                const error = new Error ("Error in vitrine rendering");
                error.data = errorResponseData;
                throw error;
        }).then(imageOpacity);
});


// Filtre des articles affichés. 
let optionFiltre = document.querySelector('#filtre');

optionFiltre.addEventListener('change', (event) =>  {

    vitrine.innerHTML = "";
    switch (event.target.value) {

        case "prixCroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return a.price - b.price  // ordonner les articles par rix croissant 
                        })
                    console.log(responseData);
                    return responseData;
                })
                .then(infoProduits => afficherProduits(infoProduits))
                .then(imageOpacity);
            break;

        case "prixDecroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return b.price - a.price  // ordonner les articles par rix décroissant 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits))
                .then(imageOpacity);
            break;

        case "nomCroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits))
                .then(imageOpacity);
            break;

        case "nomDecroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom decroissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits))
                .then(imageOpacity);
            break;
    }
}); 

updatePanierHeader();  // ATTENTION : Ne pas supprimer !!!!  <<<===========




// A finir ? cause = DRY  juste au dessus
/*
( async function filtreData () {

    let optionFiltre = document.querySelector('#filtre');

    optionFiltre.addEventListener('change', (event) =>  {

        vitrine.innerHTML = "";
        if (event.target.value == "prixCroissant" ) {
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return a.price - b.price  // ordonner les articles par rix croissant 
                        })
                    console.log(responseData);
                    ;
                })
                return responseData
        }

        if (event.target.value == "prixDecroissant" ) {
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return b.price - a.price  // ordonner les articles par rix croissant 
                        })
                    console.log(responseData);
                    
                })
                return responseData
        }

        if (event.target.value == "nomCroissant" ) {
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                        })
                    console.log(responseData);
                    
                })
                return responseData
        }

        if (event.target.value == "nomDecroissant" ) {
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                        })
                    console.log(responseData);
                    
                })
                return responseData
        }
    })
    
})().then( responseData => afficherProduits(responseData)).then(imageOpacity);
*/



