document.addEventListener("DOMContentLoaded", function() {

    //xBtn opens modal
    //xModal is modal container
    //xClose closes the modal

    const settingBtn = document.getElementById("settingBtn");
    const settingModal = document.getElementById("settingModal");
    const settingClose = settingModal.querySelector(".close");

    const shopBtn = document.getElementById("shopBtn");
    const shopModal = document.getElementById("shopModal");
    const shopClose = shopModal.querySelector(".close");

    const timerBtn = document.getElementById("timerBtn");
    const timerModal = document.getElementById("timerModal");
    const timerClose = timerModal.querySelector(".close");

    const hangerBtn = document.getElementById("hangerBtn");
    const hangerModal = document.getElementById("hangerModal");
    const hangerClose = hangerModal.querySelector(".close");

    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const loginClose = loginModal.querySelector(".close");

    const soundBtn = document.getElementById("soundBtn");
    const soundModal = document.getElementById("soundModal");
    const soundClose = soundModal.querySelector(".close");

    //Opens modal by settings its display to flex
    function openModal(modal) {
        modal.style.display = "flex"; 
    }

    //Closes the modal by hiding it
    function closeModal(modal) {
        modal.style.display = "none"; 
    }

    //Open modal event listeners
    settingBtn.addEventListener("click", () => openModal(settingModal));
    shopBtn.addEventListener("click", () => openModal(shopModal));
    timerBtn.addEventListener("click", () => openModal(timerModal));
    hangerBtn.addEventListener("click", () => openModal(hangerModal));
    loginBtn.addEventListener("click", () => openModal(loginModal)); 
    soundBtn.addEventListener("click", () => openModal(soundModal)); 

    //Close modal event listerners
    settingClose.addEventListener("click", () => closeModal(settingModal));
    shopClose.addEventListener("click", () => closeModal(shopModal));
    timerClose.addEventListener("click", () => closeModal(timerModal));
    hangerClose.addEventListener("click", () => closeModal(hangerModal));
    loginClose.addEventListener("click", () => closeModal(loginModal));
    soundClose.addEventListener("click", () => closeModal(soundModal));

    window.addEventListener("click", (e) => {
        //Checks which modal was clicked and closes it
        if(e.target == settingModal) closeModal(settingModal);
        if(e.target == shopModal) closeModal(shopModal);
        if(e.target == timerModal) closeModal(timerModal); 
        if(e.target == hangerModal) closeModal(hangerModal);
        if(e.target == loginModal) closeModal(loginModal);
        if(e.target == soundModal) closeModal(soundModal);
    });
});
