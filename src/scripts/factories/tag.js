export default class Tag {
    constructor() {
        this.arrayIngredient = [];
        this.arrayUstensils = [];
        this.arrayAppliance = [];
        this.recipes = [];

        //filter recipes

        this.filteredRecipes = [];

        //tableau temporaire
        this.tmpAppliance = [];
        this.tmpUstensils = [];
        this.tmpIngredient = [];


        //DOM
        this.search = document.getElementsByClassName("js-searchBar")[0];


        this.getRecette = (e) => this._getRecette(e);


        this.getRecette();
        this.initEvent();
        this.searchTag();
        this.openMenue();
        this.closeMenue();



    }

    initEvent() {
        this.search.addEventListener('keyup', (e) => {
            this.searchBar(e);
        })
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

            //affichage recette
            for (let i = 0; this.recipes.length > i; i++) {
                const contenerRecette = document.getElementsByClassName("contenerRecette")[0];
                contenerRecette.appendChild(this.displayMenue(this.recipes[i]));
                this.pushArray(this.recipes[i])
            }

            //Affichage Tag
            const Ustensiles = document.getElementsByClassName('ListUstensiles')[0]
            const Appareils = document.getElementsByClassName('listAppareils')[0]
            const ingredient = document.getElementsByClassName('listIgredients')[0]


            for (let i = 0; this.arrayIngredient.length > i; i++) {
                let divIngredient = document.createElement('div')
                divIngredient.innerHTML = `${this.arrayIngredient[i]}`
                divIngredient.className = 'ingredient'
                ingredient.appendChild(divIngredient)
            }
            for (let i = 0; this.arrayAppliance.length > i; i++) {
                let divAppareils = document.createElement('div')
                divAppareils.innerHTML = `${this.arrayAppliance[i]}`
                divAppareils.className = "appareil"
                Appareils.appendChild(divAppareils)
            }
            for (let i = 0; this.arrayUstensils.length > i; i++) {
                let divUstensiles = document.createElement('div')
                divUstensiles.innerHTML = `${this.arrayUstensils[i]}`
                divUstensiles.className = "ustensile"
                Ustensiles.appendChild(divUstensiles)
            }
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

    pushArray(data) {

        //enregistrement dans des tableau temporaire
        data.ingredients.map(element => this.tmpIngredient.push(element.ingredient))
        // console.log("ingredients", this.tmpIngredient)
        this.tmpAppliance.push(data.appliance)
        // console.log("appliance", this.tmpAppliance)
        data.ustensils.map(element => this.tmpUstensils.push(element))
        // console.log("ustensils", this.tmpUstensils)

        //trie de doublon pour stocker dans les tableau
        this.arrayAppliance = [...new Set(this.tmpAppliance)]
        this.arrayIngredient = [...new Set(this.tmpIngredient)]
        this.arrayUstensils = [...new Set(this.tmpUstensils)]
    }

    displayMenue(data) {

        const article = document.createElement('article');
        // console.log("test", data.ingredients)
        article.innerHTML =

            `   <div class="imageRecette"></div>
                        <div class="ficheRecette">
                            <div class="titleTime">
                                <h3>${data.name}</h3>
                                <div class="time">
                                    <img class="logoTime" src="./src/assets/icons/logo_time.svg" alt="logoTime">
                                    <h3>${data.time}</h3>
                                </div>
                            </div>
                        <div class="recette">
                            <ul>
                                ${data.ingredients.map(element =>
                `<li>${element.ingredient} : ${element.quantity} ${element.unit} </li>`)}
                            </ul>
                            <h4>${data.description}</h4>
                        </div>
                    </div>`;
        return article
    }
    searchTag() {
        const searchTagIngredient = document.querySelector(".searchTag.blue")
        const searchTagAppareils = document.querySelector(".searchTag.green")
        const searchTagUstensiles = document.querySelector(".searchTag.red")



        searchTagIngredient.addEventListener('keyup', (e) => {
            let majArray = this.arrayIngredient.map(str => str.toUpperCase())
            let majValue = searchTagIngredient.value.toUpperCase()
            let filteredRecipes = this.recipes

            if (majValue.length > 2 ) {
                // console.log("majvalue", majValue)
                for (const iteratorIngredient of majArray) {
                    console.log(iteratorIngredient);
                    filteredRecipes = filteredRecipes.filter(i => i.ingredients.some(k => k.ingredient.includes(iteratorIngredient)));
                    console.log("filteredRecipes",filteredRecipes)
                };
            }
        })
        searchTagAppareils.addEventListener('keyup', (e) => {
            let majArray = this.arrayAppliance.map(str => str.toUpperCase())
            let majValue = searchTagAppareils.value.toUpperCase()
            let filteredRecipes = this.arrayAppliance
            if (majValue.length > 2 ) {
                for (const iteratorAppliance of majArray) {
                    filteredRecipes = majArray.filter(k => k.includes(majValue));
                    console.log("filteredRecipes",filteredRecipes)
                    return this.arrayAppliance = majArray.filter(k => k.includes(majValue));
                };
            }
        })
        searchTagUstensiles.addEventListener('keyup', (e) => {
            let majArray = this.arrayUstensils.map(str => str.toUpperCase())
            let majValue = searchTagUstensiles.value.toUpperCase()
            let filteredRecipes = this.arrayUstensils
            if (majValue.length > 2 ) {
                for (const iteratorUstensiles of majArray) {
                    filteredRecipes = majArray.filter(k => k.includes(majValue));
                    console.log("filteredRecipes",filteredRecipes)
                    return this.arrayUstensils = majArray.filter(k => k.includes(majValue));
                };
            }
        })
    }

    searchBar(e) {
        let majArray = this.recipes;
        let majValue = e.target.value;
 
        this.recipes = majArray.filter(i => i.name.includes(majValue) || i.description.includes(majValue) || i.ingredients.some(k => k.ingredient.includes(majValue)));
        this.displayMenue(majArray)
    }
}
