var dropdownBtn = document.querySelector(".dropdown-btn");
var dropdownMenu = document.querySelector(".dropdown-menu");
var newBtn = document.querySelector(".new-btn");
var txtBtn = document.querySelector(".txt-btn");
var pdfBtn = document.querySelector(".pdf-btn");
var inputEl = document.querySelector(".filename-input");

var boldBtn = document.querySelector(".bold-btn");
var italicBtn = document.querySelector(".italic-btn");
var underlineBtn = document.querySelector(".underline-btn");
var colorBtn = document.querySelector(".color-btn");

var contentEl = document.querySelector(".container .content");

dropdownBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", function () {
    dropdownMenu.classList.remove("active");
});

dropdownMenu.addEventListener("click", function (event) {
    event.stopPropagation();
});

var buttons = document.querySelectorAll(".control-btn-container button");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        button.classList.toggle("active");
    });
});

boldBtn.addEventListener("click", function () {
    document.execCommand("bold");
});

dropdownBtn.addEventListener("click", function () {
    dropdownBtn.classList.add("active");
});

document.addEventListener("click", function () {
    dropdownBtn.classList.remove("active");
});

underlineBtn.addEventListener("click", function () {
    document.execCommand("underline");
});

italicBtn.addEventListener("click", function () {
    document.execCommand("italic");
});

colorBtn.addEventListener("input", function (e) {
    var target = e.target.value;
    document.execCommand("forecolor", false, target);
});

txtBtn.addEventListener("click", function () {
    var link = document.createElement("a");
    var blob = new Blob([contentEl.innerText]);
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = inputEl.value + ".txt";
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);

    document.body.removeChild(link);
});

newBtn.addEventListener("click", function () {
    dropdownMenu.classList.remove("active");
    contentEl.innerText = "";
    analyzeText();
    dropdownBtn.classList.remove("active");
});

pdfBtn.addEventListener("click", function () {
    html2pdf().from(contentEl.innerHTML).save(inputEl.value);
    dropdownBtn.classList.remove("active");
    dropdownMenu.classList.remove("active");
});

var charNumberEl = document.querySelector(".length_char span");
var wordsNumberEl = document.querySelector(".number_char span");

contentEl.addEventListener("keyup", analyzeText);

function analyzeText() {
    var contentVal = contentEl.innerText.trim();

    charNumberEl.innerText = contentVal.length;
    var wordCount = 0;
    contentVal.split(/\s+/).forEach(function (word) {
        if (word.trim() !== "") {
            wordCount++;
        }
    });
    wordsNumberEl.innerText = wordCount;
}
