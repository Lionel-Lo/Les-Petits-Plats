export default class Tag {
    constructor() {
        this.arrayIngredient = [];
        this.arrayUstensils = [];
        this.arrayAppliance = [];
        this.recipes = [];

        this.getRecette = (e) => this._getRecette(e);

        this.getRecette();
        this.openMenue();
        this.closeMenue();


    }
    async _getRecette() {
        const reponse = await fetch('./data/recipes.json', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json"
            }
        });
        if (reponse.status === 200) {
            const res = await reponse.json();

            //enregistrement tableau
            this.recipes = res.recipes;
            console.log("res", this.recipes[0])

            this.displayMenue()
            

        }

    }

    openMenue() {
        const arrowIngrediants = document.querySelector('#filterIngrediants img');
        const arrowAppareils = document.querySelector('#filterAppareils img');
        const arrowUstensiles = document.querySelector('#filterUstensiles img');
        const filterIngrediants = document.getElementById("filterIngrediants");
        const filterAppareils = document.getElementById("filterAppareils");
        const filterUstensiles = document.getElementById("filterUstensiles");
        const choiceIngrediants = document.querySelector(".choiceIngrediants");
        const choiceAppareils = document.querySelector(".choiceAppareils")
        const choiceUstensiles = document.querySelector(".choiceUstensiles")


        arrowIngrediants.addEventListener('click', e => {
            e.preventDefault();
            if (choiceIngrediants.classList.contains("hidden")) {
                filterIngrediants.classList.add("hidden");
                filterAppareils.classList.remove("hidden");
                filterUstensiles.classList.remove("hidden");
                choiceIngrediants.classList.remove("hidden");
                choiceAppareils.classList.add("hidden");
                choiceUstensiles.classList.add("hidden");
            }
        })
        arrowAppareils.addEventListener('click', e => {
            e.preventDefault();
            filterAppareils.classList.add("hidden");
            filterIngrediants.classList.remove('hidden');
            filterUstensiles.classList.remove('hidden');
            choiceAppareils.classList.remove("hidden");
            choiceIngrediants.classList.add("hidden");
            choiceUstensiles.classList.add("hidden");

        })
        arrowUstensiles.addEventListener('click', e => {
            e.preventDefault()
            filterUstensiles.classList.add("hidden");
            filterAppareils.classList.remove("hidden");
            filterIngrediants.classList.remove("hidden");
            choiceUstensiles.classList.remove("hidden");
            choiceAppareils.classList.add("hidden");
            choiceIngrediants.classList.add("hidden");
        })
    }
    closeMenue() {
        const arrowIngrediants = document.querySelector('.choiceIngrediants .arrowRotate0');
        const arrowAppareils = document.querySelector('.choiceAppareils .arrowRotate0');
        const arrowUstensiles = document.querySelector('.choiceUstensiles .arrowRotate0');
        const filterIngrediants = document.getElementById("filterIngrediants");
        const filterAppareils = document.getElementById("filterAppareils");
        const filterUstensiles = document.getElementById("filterUstensiles");
        const choiceIngrediants = document.querySelector(".choiceIngrediants");
        const choiceAppareils = document.querySelector(".choiceAppareils");
        const choiceUstensiles = document.querySelector(".choiceUstensiles");

        arrowIngrediants.addEventListener("click", e => {
            e.preventDefault();
            filterIngrediants.classList.remove("hidden");
            choiceIngrediants.classList.add("hidden");
        })
        arrowAppareils.addEventListener("click", e => {
            e.preventDefault();
            filterAppareils.classList.remove("hidden");
            choiceAppareils.classList.add("hidden");
        })
        arrowUstensiles.addEventListener("click", e => {
            e.preventDefault();
            filterUstensiles.classList.remove("hidden");
            choiceUstensiles.classList.add("hidden");
        })
    }

    displayListeIngrediant() {
        for (let i = 0; this.recipes.length > i; i++) {
            this.arrayIngredient = this.recipes[i].ingredients
            const ingrediants = this.arrayIngredient
            console.log(ingrediants[i])
            const li = `<li>${ingrediants}</li>`
        }
    }

    displayMenue() {
        const contenerRecette = document.getElementsByClassName("contenerRecette")[0];
        const recette = this.recipes;
        console.log(contenerRecette);

        contenerRecette.innerHTML = "";

        for (let i = 0; recette.length > i; i++) {
            const article = document.createElement('article');
            const ingrediants = this.displayListeIngrediant(recette[i]);

            article.innerHTML =

                `   <div class="imageRecette"></div>
                        <div class="ficheRecette">
                            <div class="titleTime">
                                <h3>${recette[i].name}</h3>
                                <div class="time">
                                    <img class="logoTime" src="./src/assets/icons/logo_time.svg" alt="logoTime">
                                    <h3>${recette[i].time}</h3>
                                </div>
                            </div>
                        <div class="recette">
                            <ul>
                                ${ingrediants}
                            </ul>
                            <h4>${recette[i].description}</h4>
                        </div>
                    </div>`;
                    contenerRecette.appendChild(article)
                    this.displayListeIngrediant();
        }


    }
}
