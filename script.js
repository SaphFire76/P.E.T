document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("settingBtn");
    const modal_container = document.getElementById("settingModal");
    const closeBtn = document.querySelector(".close");

    //modal_container.style.display = "none";

    openBtn.addEventListener("click", () => {
        modal_container.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal_container.style.display = "none";
    });

    window.addEventListener("click", (e) =>{
        if(e.target == open) {
            modal_container.style.display = "none";
        }
    });
    
});
