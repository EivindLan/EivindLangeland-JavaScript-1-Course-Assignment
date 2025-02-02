function displayBasketItems() {
    const basketItemsContainer = document.querySelector("#basket-items");
    const totalPriceElement = document.querySelector("#totalPrice");
    if(!basketItemsContainer) return;

    basket = JSON.parse(localStorage.getItem("basket")) || [];
    
    basketItemsContainer.innerHTML = "";

    let totalPrice = 0;
   
    if(basket.length === 0){
        basketItemsContainer.innerHTML = "<p>Your basket is empty</p>"
        totalPriceElement.innerHTML = "$0.00";
        return;
    }

    basket.forEach(game => {
        const basketItem = document.createElement("div");
        basketItem.className = "basket-item";
        basketItem.innerHTML = `
                <h3>${game.title}</h3>
                <img src="${game.image}"></img>
                <p>Price: ${game.price} $</p>
                <button class="removeFromBasket" data-game-id="${game.id}">Remove from basket</button>

                `;
        basketItemsContainer.appendChild(basketItem);

        totalPrice += parseFloat(game.price);
    });

    totalPriceElement.innerHTML = `$${totalPrice.toFixed(2)}`;
    RemoveFromBasketButtons();

}

document.addEventListener("DOMContentLoaded", displayBasketItems);

updateBasketCount();

function RemoveFromBasketButtons() {
    const removeButtons = document.querySelectorAll(".removeFromBasket");
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const gameId = event.target.dataset.gameId;
            console.log("button clicked :" + gameId); // error testing
            removeFromBasket(gameId);
        });
    });
}

function removeFromBasket(gameId) {
    basket = basket.filter(game => String(game.id) !==String(gameId));
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log("game id: " + gameId);
    displayBasketItems();
    updateBasketCount();
    console.log(basket);
}

function updateBasketCount() {
    const basketCountElement = document.querySelector("#basketHowManyItems");
    basketCountElement.textContent = basket.length;                                
}

// now to add prices
