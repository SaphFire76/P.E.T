document.addEventListener("DOMContentLoaded", () => {
    const fontButton = document.querySelector(".font");
    const textElements = document.querySelectorAll("h2, span, label, .text, #timer, #coins div, .label, .modal-content, .option");
    const modal = document.querySelector(".modal-content");
    const header = document.querySelector("#header");
    const timer = document.querySelector("#timer");
    const coins = document.querySelector("#coins");
    const sliders = document.querySelectorAll(".slider");
    const sliderContainers = document.querySelectorAll(".toggle");
    const fontContainer = document.querySelector(".font-container");

    const originalFontSize = parseFloat(window.getComputedStyle(textElements[0]).fontSize) || 16;
    const fontSizes = [1, 1.2, 1.5, 2, 2.5];

    const headerHeights = ["10vh", "12vh", "14vh", "16vh", "18vh"];
    const labelOffsets = ["0px", "-30px", "-60px", "-90px", "-120px"];
    const sliderOffsets = ["5px", "10px", "15px", "20px", "25px"];
    
    let currentIndex = 0;

    fontButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % fontSizes.length;

        const newSize = `${originalFontSize * fontSizes[currentIndex]}px`;

        const newHeaderHeight = headerHeights[currentIndex];
        const newLabelOffset = labelOffsets[currentIndex];
        const newSliderOffset = sliderOffsets[currentIndex];

        textElements.forEach(el => {
            el.style.fontSize = newSize;
        });

        modal.style.width = `${300 + currentIndex * 50}px`;
        modal.style.padding = `${20 + currentIndex * 5}px`;

        header.style.height = newHeaderHeight;
        timer.style.fontSize = newSize;
        coins.style.fontSize = newSize;

        const labels = modal.querySelectorAll(".label");
        labels.forEach(label => {
            label.style.position = "relative";
            label.style.left = newLabelOffset;        
        });

        sliders.forEach(slider => {
            slider.style.transform = `translateX(${newSliderOffset})`;
        });

        fontButton.textContent = `${fontSizes[currentIndex]}x`;
    });

    textElements.forEach(el => {
        el.style.fontSize = `${originalFontSize}px`;
    });

    fontContainer.style.display = "flex";
    fontContainer.style.flexDirection = "column";
    fontContainer.style.alignItems = "flex-start";

    sliderContainers.forEach(container => {
        container.style.marginBottom = "10px";
    });
});
