const closePanel = document.querySelector("#closeControlPanel");
const openPanel = document.querySelector(".menu");
const panel = document.querySelector(".control-panel");
const hideFormBtn = document.querySelector("#cancelButton");
const form = document.querySelector("form");
const showFormBtns = document.querySelectorAll(".showForm");

showFormBtns.forEach(button => {
    button.addEventListener("click" , (event) => {
        form.style.display = "flex";
        document.querySelector("body").classList.add("blur");
    })
})

// Event listener to hide form
hideFormBtn.addEventListener("click" , (event) => {
    form.style.display = "none"
    document.querySelector("body").classList.remove("blur");

})


openPanel.addEventListener("click" , (event) => {
    
    panel.classList.remove("slidePanelBACK") 
    panel.classList.add("slidePanelIN")
})

closePanel.addEventListener("click" , (event) => {
    panel.classList.add("slidePanelBACK");
    panel.classList.add("slidePanelIN");
})


const myLibrary = [];

function Book(title , author , pages , readState)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
}

Book.prototype.toggleState = function()
{
    this.readState = true
}

function addBookToLibrary()
{
    
}