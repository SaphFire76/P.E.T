document.addEventListener("DOMContentLoaded", () =>{
    const toggleBtn = document.querySelectorAll(".option input");
    const darkmodeToggle = toggleBtn[1];

    darkmodeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("darkmode", "enabled");
        } else{
            localStorage.setItem("darkmode", "disabled");
        }
    });

    if(localStorage.getItem("darkmode") == "enabled"){
        document.body.classList.add("dark-mode");
        darkmodeToggle.checked = true;
    }

});
