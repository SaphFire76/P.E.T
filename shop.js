document.addEventListener("DOMContentLoaded", function () {
    // Initialize the player object
    const player = {
        coins: isLoggedIn ? parseInt(coins) : (parseInt(localStorage.getItem("playerCoins")) || 0),
        inventory: JSON.parse(localStorage.getItem("playerInventory")) || []
    };

    const shopItems = [
        { id: "petfood", name: "Pet Food", price: 5, image: "petfood.png" },
        { id: "water", name: "Water", price: 3, image: "waterbottle.png" },
        { id: "tophat", name: "Top Hat", price: 60, image: "tophat.png" },
        { id: "scarf", name: "Scarf", price: 15, image: "scarf.png" }
    ];

    const coinsDisplay = document.querySelector("#coins #header1");
    const shopGrid = document.querySelector(".shop-grid");
    const shopModal = document.getElementById("shopModal");

    function shopinit() {
        updateCoinsDisplay();
        renderShopItem();
    }

    function updateCoinsDisplay() {
        if (coinsDisplay) {
            coinsDisplay.textContent = player.coins; // Update the header with the correct coin value
            console.log("Coins Display Updated:", player.coins); // Debugging line
            //localStorage.setItem("playerCoins", player.coins);

            // Update the database if the user is logged in
            if (isLoggedIn) {
                localStorage.removeItem("playerCoins"); // Clear outdated data
                console.log("Updating coins in the database:", player.coins); // Debugging line
                fetch('update_coins.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `coins=${player.coins}`
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.success) {
                            console.error("Failed to update coins in the database:", data.error);
                        }
                    })
                    .catch(error => console.error("Error updating coins:", error));
            }
        }
    }

    function renderShopItem() {
        shopGrid.innerHTML = "";

        shopItems.forEach(item => {
            const owned = player.inventory.includes(item.id);
            const itemElement = document.createElement("button");
            itemElement.className = `shop-item ${owned ? "owned" : ''}`;
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `<img src="${item.image}" alt="${item.name}"> 
            <span class="price"> ${item.price} Coins</span>
            ${owned ? '<span class="owned-label">Owned</span>' : ''}`;

            if (!owned) {
                itemElement.addEventListener("click", () => purchaseItem(item));
            }

            shopGrid.appendChild(itemElement);
        });
    }

    function purchaseItem(item) {
        if (player.coins >= item.price) {
            player.coins -= item.price;
            updateCoinsDisplay();

            player.inventory.push(item.id);
            localStorage.setItem("playerInventory", JSON.stringify(player.inventory));

            renderShopItem();
            showMessage(`Purchased ${item.name}!`, "success");
        } else {
            showMessage("Insufficient Coins", "error");
        }
    }

    function showMessage(text, type) {
        const existingMessage = document.querySelector(".shop-message");
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement("div");
        message.className = `shop-message ${type}`;
        message.textContent = text;

        const modalContent = shopModal.querySelector(".modal-content");
        if (modalContent) {
            modalContent.insertBefore(message, modalContent.firstChild);
        }

        setTimeout(() => {
            message.remove();
        }, 3000);
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
