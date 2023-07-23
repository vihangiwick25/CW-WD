document.addEventListener("DOMContentLoaded", function () {
    var splashContainer = document.querySelector(".splash-container");
    var enterButton = document.getElementById("enterButton");

    setTimeout(function () {
        splashContainer.style.opacity = "2";
        setTimeout(function () {
            window.location.href = "main.html"; //add main.html
        }, 1000);
    }, 4000);

    enterButton.addEventListener("click", function () {
        window.location.href = "main.html";
    });
});
