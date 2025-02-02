const API_URL = 'https://api.noroff.dev/api/v1/gamehub'; 

let allGames = [];

async function fetchGames() {
    const loadingIndicator = document.querySelector("#loading");
    loadingIndicator.style.display = "flex";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        allGames = data;
        displayGames(allGames);
    } catch (error) {
        alert("Failed to fetch API Data");
    } finally {
        loadingIndicator.style.display = "none";
    }
    
}

fetchGames();

function displayGames(allGames) {
    const gameContent = document.querySelector(".gameContent");
    gameContent.innerHTML = ""; 

    allGames.forEach(game => {
        const gameItem = document.createElement("a");
        gameItem.className = "game";
        const isOnSale = game.onSale; // wanted a extra attribute
        gameItem.setAttribute("data-game-id", game.id);
        gameItem.innerHTML = `
             <h2 class="gameTitle">
               ${game.title}
             </h2>
             <img src="${game.image}" alt="${game.title}">
             </img>
             <h3 class="ageRating">
               ${game.ageRating}
             </h3>
             <h4 class="price" style="${isOnSale ? 'text-decoration: line-through; color: gray;' : ''}"> 
               ${game.price}$
             </h4>
             <h5 class="discountedPrice" style="${isOnSale ? 'color: green;' : 'visibility: hidden;'}">${game.discountedPrice}$</h5> 
             
             
            `
         
            gameContent.appendChild(gameItem);
            gameItem.addEventListener("click", () => openGameDetails(game));
           
    })

    addToBasketButtons();
}

function openGameDetails(game) {
    localStorage.setItem("selectedGame", JSON.stringify(game));
    const gameId = game.id;
    const url = `productPage.html?gameId=${gameId}`;
    window.location.href = url;
}

function filterGames(className) {
    if (className === "onSale") {
        filteredGames = allGames.filter(game => game.onSale);
    }
    else {
        filteredGames = allGames.filter(game => game.genre === className);
    }
    displayGames(filteredGames);
}

const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const className = button.className;
        filterGames(className);
    })
})

let basket = JSON.parse(localStorage.getItem("basket")) || [];

function updateBasketCount() {
    const basketCountElement = document.querySelector("#basketHowManyItems");
    basketCountElement.textContent = basket.length;                                
}

function addToBasket(game) {
    const exists = basket.some(item => item.id === game.id);    
    if(!exists) {
        basket.push(game);
        localStorage.setItem("basket", JSON.stringify(basket));
        updateBasketCount();
    }
    else {
        return;
    }
    
}

function addToBasketButtons() {
    const addToBasketButtons = document.querySelectorAll(".add2Basket");
    addToBasketButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const gameId = Number(event.target.closest(".game").dataset.gameId);
            const game = allGames.find(game => game.id === gameId);
            addToBasket(game);
        })
    })
}

updateBasketCount();