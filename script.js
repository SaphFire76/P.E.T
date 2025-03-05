const open = document.getElementById("settingModal");
const modalBtn = document.getElementById("settingBtn");
const close = document.getElementById("close")[0];

modalBtn.addEventListerner("click", () => {
    modal.style.display = "flex";
});

close.addEventListerner("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) =>{
    if(e.target == open) {
        modal.style.display = "none";
    }
});