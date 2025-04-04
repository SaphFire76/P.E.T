document.addEventListener("DOMContentLoaded", () =>{
    const toggleBtn = document.querySelectorAll(".option input");
    const darkmodeToggle = toggleBtn[1];

    //Changes to darkmode
    darkmodeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        //Saves dark mode preference in local storage
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
