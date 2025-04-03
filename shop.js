document.addEventListener("DOMContentLoaded", function(){
    const player ={
        coins: 0,
        inventory: JSON.parse(localStorage.getItem("playerInventory")) ||[]
    };

    const shopItems = [
        {id:"petfood", name:"Pet Food", price: 5, image:"petfood.png"},
        {id:"water", name:"Water", price: 3, image:"waterbottle.png"},
        {id:"tophat", name:"Top Hat", price: 60, image:"tophat.png"},
        {id:"scarf", name:"Scarg", price: 15, image:"scarf.png"}
    ];

    const coinsDisplay = document.querySelector("#coins #header1");
    const shopGrid = document.querySelector(".shop-grid");
    const shopModal = document.getElementById("shopModal");

    function shopinit(){
        updateCoinsDispay();
        renderShopItem();
    }

    function updateCoinsDispay(){
        if(coinsDisplay){
            coinsDisplay.textContent = player.coins;
        }
    }

    function renderShopItem(){
        shopGrid.innerHTML = "";

        shopItems.forEach(item => {
            const owned = player.inventory.includes(item.id);
            const itemElement = document.createElement("button");
            itemElement.className= `shop-item ${owned ? "owned": ''}`;
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `<img src="${item.image}" alt="${item.name}"> 
            <span class="price"> ${item.price} Coins</span>
            ${owned ? '<span class="owned-label">Owned</span>' : ''}`;

            if(!owned){
                itemElement.addEventListener("click", ()=> purchaseItem(item));
            }

            shopGrid.appendChild(itemElement);

        });
    }

    function purchaseItem(item){
        if(player.coins >= item.price){
            player.coins -= item.price;
            updateCoinsDispay();

            player.inventory.push(item.id);
            localStorage.setItem("playerInventory", JSON.stringify(player.inventory));

            renderShopItem();
            showMessage(`Purchased ${item.name}!`, "success");

            if(item.id == "tophat" || item.id== "scarf"){
            }
        }else{
            showMessage("Insufficient Coins", "error");
        }
        
    }

    function showMessage(text, type){
        const existingMessage = document.querySelector(".shop-message");
        if(existingMessage){
            existingMessage.remove();
        }
            
        const message = document.createElement("div");
        message.className = `shop-message ${type}`;
        message.textContent = text;

        const modalContent = shopModal.querySelector(".modal-content");
        if(modalContent){
            modalContent.insertBefore(message, modalContent.firstChild);
        }

        setTimeout(() =>{
            message.remove();
        }, 3000)
    }

    shopinit();
   
    // RESET LOCAL STORAGE //
    /*
    localStorage.removeItem("playerInventory");
    localStorage.removeItem("selectedOutfit");
    localStorage.removeItem("playerCoins")
    location.reload();
    */  
});