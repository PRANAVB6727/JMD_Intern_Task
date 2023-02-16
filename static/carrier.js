window.onload = function () {
    var btn1 = document.getElementById("button2");
    var myForm = document.getElementById("formContainer2");
    btn1.addEventListener("click", () => {
        myForm.style.display = "inline";
        myForm.reset();
    });
    var btn2 = document.getElementById("sButton2");
    btn2.addEventListener("click", ()=>{
        myForm.style.display = "none";
    });
}
