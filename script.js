const modal = document.getElementById("settingModal");
const modalBtn = document.getElementById("settingBtn");
const close = document.getElementById("close")[0];

modalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

close.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) =>{
    if(e.target == open) {
        modal.style.display = "none";
    }
});