//DOM
document.addEventListener("DOMContentLoaded", () => {
    //DOM elemets
    const fontButton = document.querySelector(".font"); //Font size toggle
    const textElements = document.querySelectorAll("h2, span, label, .text, #timer, #coins div, .label, .modal-content, .option"); //All elements to be resized
    const modals = document.querySelectorAll(".modal-content, .settings-modal"); //Modal resizing
    const header = document.querySelector("#header");
    const timer = document.querySelector("#timer");
    const coins = document.querySelector("#coins");
    const sliders = document.querySelectorAll(".slider");
    const sliderContainer = document.querySelectorAll(".toggle");

    //Font size configurations
    const originalFontSize = parseFloat(window.getComputedStyle(textElements[0]).fontSize) || 16; //Gets the base font size
    const fontSizes = [1, 1.2, 1.5, 2, 2.5]; //Font size options

    const headerHeight = ["10vh", "12vh", "14vh", "16vh", "18vh"]; //Header font sizes
    const labelOffset = ["0px", "-30px", "-60px", "-90px", "-120px"]; //Label positioning
    const sliderOffset = ["5px", "10px", "15px", "20px", "25px"]; //Slider positioning

    let currentIndex = parseInt(localStorage.getItem("fontSizeIndex")) || 0; //Current size

    //Applies the current font size 
    const applyFontSize = ()=> {
        //calcualtes new values base on the current index
        const newSize = `${originalFontSize * fontSizes[currentIndex]}px`;
        const newHeaderHeight = headerHeight[currentIndex];
        const newLabelOffset = labelOffset[currentIndex];
        const newSliderOffset = sliderOffset[currentIndex];

        //Apply new font size to all elements
        textElements.forEach(el => {
            el.style.fontSize = newSize;
        });

        //Adjustment to modal layout
        modals.forEach(modal => {
            modal.style.width = `${300 + currentIndex * 50}px`;
            modal.style.padding = `${20 + currentIndex * 5}px`;
            modal.style.height = "auto";
            modal.style.minHeight = `${200 + currentIndex * 30}px`;
            modal.style.overflow = "auto";

            //Modal adjusmtent for timer modal
            if(modal.classList.contains("timer-modal")){
                const timerItem = modal.querySelectorAll(".timer-item");
                timerItem.forEach(item => {
                    item.style.width = `${110 + currentIndex * 20}px`;
                    item.style.height = `${50 + currentIndex * 10}px`;
                });
                
            }

        });

        //Adjustment to header and the main display
        header.style.height = newHeaderHeight;
        timer.style.fontSize = newSize;
        coins.style.fontSize = newSize;

        //Positions labels based on current size
        const labels = document.querySelectorAll(".label");
        labels.forEach(label => {
            label.style.position = "relative";
            label.style.left = newLabelOffset;
        });

        //Adjustment to slider positions
        sliders.forEach(slider => {
            slider.style.transform = `translateX(${newSliderOffset})`;
        });

        fontButton.textContent = `${fontSizes[currentIndex]}x`;
    };

    
    applyFontSize();//Applies font size settings
    fontButton.addEventListener("click", () => { //Handler for font size toggle button
        currentIndex = (currentIndex + 1) % fontSizes.length; //cycles to next size level
        localStorage.setItem("fontSizeIndex", currentIndex); //Saves prefrences in localstorage
        applyFontSize();
    });

    sliderContainer.forEach(container => {
        container.style.marginBottom = "10px";
    });
});
