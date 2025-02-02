document.addEventListener("DOMContentLoaded", function (){
    const game = JSON.parse(localStorage.getItem("selectedGame")); 

    if (!game) return;

    document.querySelector(".gamePicture").src = game.image;
    document.querySelector("h1").innerText = "Title: " + game.title;
    document.querySelector("h2").innerText = "Ages: " + game.ageRating;
    document.querySelector("h3").innerText = "Genre: " + game.genre;
    document.querySelector("h4").innerText = "Price: " + game.price + " $";
    document.querySelector("h5").innerText = "Discounted price: " + game.discountedPrice + " $";
    document.querySelector("p").innerText = game.description;

    const buttonAdd2Cart = document.querySelector(".add2Basket");
    buttonAdd2Cart.addEventListener("click", function () {
        addToBasket(game);
        buttonAdd2Cart.style.backgroundColor = "green";
        buttonAdd2Cart.textContent = "Added!";
    });
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