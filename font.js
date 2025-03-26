document.addEventListener("DOMContentLoaded", () => {
    const fontButton = document.querySelector(".font");
    const textElements = document.querySelectorAll("h2, span, label, .text, #timer, #coins div, .label, .modal-content, .option");
    const modals = document.querySelectorAll(".modal-content, .settings-modal");
    const header = document.querySelector("#header");
    const timer = document.querySelector("#timer");
    const coins = document.querySelector("#coins");
    const sliders = document.querySelectorAll(".slider");
    const sliderContainer = document.querySelectorAll(".toggle");
    const fontContainer = document.querySelector(".font-container");

    const originalFontSize = parseFloat(window.getComputedStyle(textElements[0]).fontSize) || 16;
    const fontSizes = [1, 1.2, 1.5, 2, 2.5];

    const headerHeight = ["10vh", "12vh", "14vh", "16vh", "18vh"];
    const labelOffset = ["0px", "-30px", "-60px", "-90px", "-120px"];
    const sliderOffset = ["5px", "10px", "15px", "20px", "25px"];

    let currentIndex = parseInt(localStorage.getItem("fontSizeIndex")) || 0;

    const applyFontSize = ()=> {
        const newSize = `${originalFontSize * fontSizes[currentIndex]}px`;
        const newHeaderHeight = headerHeight[currentIndex];
        const newLabelOffset = labelOffset[currentIndex];
        const newSliderOffset = sliderOffset[currentIndex];

        textElements.forEach(el => {
            el.style.fontSize = newSize;
        });

        modals.forEach(modal => {
            modal.style.width = `${300 + currentIndex * 50}px`;
            modal.style.padding = `${20 + currentIndex * 5}px`;
            modal.style.height = "auto";
            modal.style.minHeight = `${200 + currentIndex * 30}px`;
            modal.style.overflow = "auto";
        });

        header.style.height = newHeaderHeight;
        timer.style.fontSize = newSize;
        coins.style.fontSize = newSize;

        const labels = document.querySelectorAll(".label");
        labels.forEach(label => {
            label.style.position = "relative";
            label.style.left = newLabelOffset;
        });

        sliders.forEach(slider => {
            slider.style.transform = `translateX(${newSliderOffset})`;
        });

        fontButton.textContent = `${fontSizes[currentIndex]}x`;
    };

    applyFontSize();
    fontButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % fontSizes.length;
        localStorage.setItem("fontSizeIndex", currentIndex);
        applyFontSize();
    });

    fontContainer.style.display = "flex";
    fontContainer.style.flexDirection = "column";
    fontContainer.style.alignItems = "flex-start";

    sliderContainer.forEach(container => {
        container.style.marginBottom = "10px";
    });
});
