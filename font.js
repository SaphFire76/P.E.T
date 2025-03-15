document.addEventListener("DOMContentLoaded", () => {
    const fontButton = document.querySelector(".font");    
    const textElements = document.querySelectorAll("h1, h2, h3, p, span, label, .text, #timer, #coins div, .label, .modal-content, .option");
    const modal = document.querySelector(".modal-content");
    //const sliders = document.querySelectorAll(".slider");
    const fontSizes = ["1x", "1.5x", "2x", "2.5x"];
    let currentIndex = 0;

    fontButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % fontSizes.length;
        const newSize = fontSizes[currentIndex];

        textElements.forEach(el => {
            el.style.fontSize = newSize;
        });

        modal.style.width = `${300 + currentIndex * 50}px`;
        modal.style.padding = `${20 + currentIndex * 5}px`;

        sliders.forEach(slider => {
            slider.style.width = `${60 + currentIndex * 10}px`;
            slider.style.height = `${34 + currentIndex * 5}px`;
        });

        document.querySelectorAll(".label").forEach(label => {
            label.style.padding = `${10 + currentIndex * 2}px`;
            label.style.display = "inline-block"; 
        });

        fontButton.textContent = `Size: ${newSize}`;
    });

    textElements.forEach(el => {
        el.style.fontSize = "1rem";
    });
});
