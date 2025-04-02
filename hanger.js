document.addEventListener("DOMContentLoaded", function () {
    const outfits = [
        { src: "cat.png", name: "Normal Cat", locked: false },
        { src: "tophatCat.png", name: "Top Hat Cat", locked: true },
        { src: "scarfCat.png", name: "Scarf Cat", locked: true }
    ];

    let currentIndex = 0;
    let coins = 15; // Example starting balance

    // Retrieve purchased outfits from localStorage
    const purchasedOutfits = JSON.parse(localStorage.getItem("purchasedOutfits")) || [];

    // Unlock outfits if purchased
    outfits.forEach(outfit => {
        if (purchasedOutfits.includes(outfit.name)) {
            outfit.locked = false;
        }
    });

    const currentOutfitImg = document.getElementById("currentOutfit");
    const outfitStatus = document.getElementById("outfitStatus");
    const prevBtn = document.getElementById("prevOutfit");
    const nextBtn = document.getElementById("nextOutfit");
    const selectBtn = document.getElementById("selectOutfit");
    const mainCatImg = document.querySelector(".catbtn img"); // Main space cat

    function updateOutfitDisplay() {
        currentOutfitImg.src = outfits[currentIndex].src;
        outfitStatus.textContent = outfits[currentIndex].locked ? "Locked" : outfits[currentIndex].name;
        selectBtn.disabled = outfits[currentIndex].locked;
    }

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + outfits.length) % outfits.length;
        updateOutfitDisplay();
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % outfits.length;
        updateOutfitDisplay();
    });

    selectBtn.addEventListener("click", function () {
        if (!outfits[currentIndex].locked) {
            mainCatImg.src = outfits[currentIndex].src; // Change main cat image
            alert(`You have selected ${outfits[currentIndex].name}!`);
        }
    });

    updateOutfitDisplay();
});
