document.addEventListener("DOMContentLoaded", function() {
    const settingBtn = document.getElementById("settingBtn");
    const settingModal = document.getElementById("settingModal");
    const settingClose = settingModal.querySelector(".close");

    const shopBtn = document.getElementById("shopBtn");
    const shopModal = document.getElementById("shopModal");
    const shopClose = shopModal.querySelector(".close");

    function openModal(modal) {
        modal.style.display = "flex";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    settingBtn.addEventListener("click", () => openModal(settingModal));
    shopBtn.addEventListener("click", () => openModal(shopModal));

    settingClose.addEventListener("click", () => closeModal(settingModal));
    shopClose.addEventListener("click", () => closeModal(shopModal));

    window.addEventListener("click", (e) => {
        if (e.target == settingModal) closeModal(settingModal);
        if (e.target == shopModal) closeModal(shopModal);
    });
});
