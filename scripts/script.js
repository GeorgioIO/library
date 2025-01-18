const closePanel = document.querySelector("#closeControlPanel");
const openPanel = document.querySelector(".menu");
const panel = document.querySelector(".control-panel");

openPanel.addEventListener("click" , (event) => {
    
    panel.classList.remove("slidePanelBACK") 
    panel.classList.add("slidePanelIN")
})

closePanel.addEventListener("click" , (event) => {
    panel.classList.add("slidePanelBACK");
    panel.classList.add("slidePanelIN");
})


const myLibrary = [];

function Book()
{

}

function addBookToLibrary()
{
    
}