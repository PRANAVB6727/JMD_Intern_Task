window.onload = function () {
    var btn1 = document.getElementById("button1");
    var showForm = document.getElementById("formContainer");
    btn1.addEventListener("click", () => {
        showForm.style.display = "inline";
        showForm.reset();
    });
    var btn2 = document.getElementById("sButton");
    btn2.addEventListener("click", ()=>{
        showForm.style.display = "none";
    });
}
