document.addEventListener("DOMContentLoaded", function() {
    const settingBtn = document.getElementById("settingBtn");
    const settingModal = document.getElementById("settingModal");
    const settingClose = settingModal.querySelector(".close");

    const shopBtn = document.getElementById("shopBtn");
    const shopModal = document.getElementById("shopModal");
    const shopClose = shopModal.querySelector(".close");

    const timerBtn = document.getElementById("timerBtn");
    const timerModal = document.getElementById("timerModal");
    const timerClose = timerModal.querySelector(".close");

    function openModal(modal) {
        modal.style.display = "flex";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    settingBtn.addEventListener("click", () => openModal(settingModal));
    shopBtn.addEventListener("click", () => openModal(shopModal));
    timerBtn.addEventListener("click", () => openModal(timerModal));

    settingClose.addEventListener("click", () => closeModal(settingModal));
    shopClose.addEventListener("click", () => closeModal(shopModal));
    timerClose.addEventListener("click", () => closeModal(timerModal));

    window.addEventListener("click", (e) => {
        if(e.target == settingModal) closeModal(settingModal);
        if(e.target == shopModal) closeModal(shopModal);
        if(e.target == timerModal) closeModal(timerModal); 
    });
});
