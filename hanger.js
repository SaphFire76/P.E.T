document.addEventListener("DOMContentLoaded", function() {
    const outfits = [
        {src:"cat.png", id:"normal", name:"Normal Cat", locked:false},
        {src:"tophatCat.png", id:"tophat", name:"Tophat Cat", locked:true},
        {src:"scarfCat.png", id:"scarf", name:"Scarf Cat", locked:true}
    ];

    let currentIndex = 0;
    const currentOutfitImg = document.getElementById("currentOutfit");
    const outfitStatus = document.getElementById("outfitStatus");
    const selectBtn = document.getElementById("selectOutfit");
    const mainCatImg = document.querySelector(".catbtn img");
    const previousBtn = document.querySelector(".previousOutfit");
    const nextBtn = document.querySelector(".nextOutfit")

    function checkPurchase(){
        const purchaseItem = JSON.parse(localStorage.getItem("playerInventory")) || [];

        outfits.forEach(outfit => {
            if(purchaseItem.includes(outfit.id)){
                outfit.locked = false;
            }
        });
    }

    function updateOutfitDisplay(){
        const currentOutfit = outfits[currentIndex];
        currentOutfitImg.src= currentOutfit.src;

        if(currentOutfit.locked){
            outfitStatus.textContent = "Locked - (Purchasable in shop)";
            outfitStatus.style.color = "#C70039";
            selectBtn.disabled = true;
            currentOutfitImg.style.filter = "grayscale(100%)";
            currentOutfitImg.style.opacity = "0.5";
        }else{
            outfitStatus.textContent = currentOutfit.name;
            outfitStatus.style.color = "#8CBD8C";
            selectBtn.disabled = false;
            currentOutfitImg.style.filter = "none";
            currentOutfitImg.style.opacity = "1";
        }
    }

    previousBtn.addEventListener("click", function(){
        currentIndex = (currentIndex - 1 + outfits.length) % outfits.length;
        updateOutfitDisplay();
    });  

    nextBtn.addEventListener("click", function(){
        currentIndex = (currentIndex + 1) % outfits.length;
        updateOutfitDisplay();
    });

    selectBtn.addEventListener("click", function(){
        if(!outfits[currentIndex].locked){
            mainCatImg.src = outfits[currentIndex].src;
            localStorage.setItem("selectedOutfit", outfits[currentIndex].src);
        
            document.getElementById("hangerModal").style.display= "none";
        }
    });

    document.getElementById("hangerBtn").addEventListener("click",function(){
        checkPurchase();
        updateOutfitDisplay();
    });

    const savedOutfit = localStorage.getItem("selectedOutfit");
    if(savedOutfit){
        mainCatImg.src = savedOutfit;
    }

});