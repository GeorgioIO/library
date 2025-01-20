const closePanel = document.querySelector("#closeControlPanel");
const openPanel = document.querySelector(".menu");
const panel = document.querySelector(".control-panel");
const hideFormBtn = document.querySelector("#cancelButton");
const form = document.querySelector("form");
const showFormBtns = document.querySelectorAll(".showForm");
const showThemesBtns = document.querySelectorAll(".themes");
const themeTogglers = document.querySelectorAll(".theme-toggler");
const addBookBtn = document.querySelector("#addBookButton");
const mainBody = document.querySelector("main");


themeTogglers.forEach(toggler => {
    toggler.addEventListener("click", (event) => {
        console.log(event.currentTarget);
        const selectedTheme = event.currentTarget.dataset.theme; // Get the selected theme
        console.log(`Theme selected: ${selectedTheme}`);
        
        themeTogglers.forEach(toggler => {
            if (toggler.dataset.theme === selectedTheme) {
                toggler.classList.add("active-theme"); // Highlight the selected theme
            } else {
                toggler.classList.remove("active-theme"); // Remove highlight from others
            }
        });

        // Apply the theme to the body
        const body = document.querySelector("body");
        if (selectedTheme === "dark") {
            body.classList.remove("light-mode");
        } else if (selectedTheme === "light") {
            body.classList.add("light-mode");
        }
    });
});

showThemesBtns.forEach(button => { 
    button.addEventListener("click" , (event) => {
        let panel = button.querySelector(".theme-panel")
        if (event.target.closest(".theme-panel li")) {
            return; // Stop execution to prevent panel toggling
        }

        if(panel.dataset.state === "closed")
        {
            panel.style.display = "block";
            panel.dataset.state = "open"
        }
        else
        {
            panel.style.display = "none";
            panel.dataset.state = "closed"
        }
    })
})

showFormBtns.forEach(button => {
    button.addEventListener("click" , (event) => {
        form.style.display = "flex";
        document.querySelector("body").classList.add("blur");
    })
})

// Event listener to hide form
hideFormBtn.addEventListener("click" , (event) => {
    event.preventDefault()
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

function addBookToLibrary(book)
{
    myLibrary.push(book);
    let libraryLength = myLibrary.length
    let bookContent = `
        <div class="body">
            <div class="title">
                <p>${myLibrary[libraryLength - 1].title}</p>
            </div>
            <div class="author">
                <p>By ${myLibrary[libraryLength - 1].author}</p>
            </div>
            <div class="pages">
                <p>${myLibrary[libraryLength - 1].pages} Pages</p>
            </div>
            <div class="state">
                <p><b>Read : </b> ${myLibrary[libraryLength - 1].readState}</p>
            </div>
        </div>
        <div class="footer">
            <button>Toggle state</button>
            <button id="deleteBookBtn" onclick="addDeleteFunctionality(this , event)">Delete</button>
        </div>
    `
    const tempDiv = document.createElement("div");
    tempDiv.dataset.index =  myLibrary.length - 1;
    tempDiv.classList.add("book")
    tempDiv.innerHTML = bookContent;
    mainBody.appendChild(tempDiv);
    

}
function addDeleteFunctionality(btn , event)
{
    event.preventDefault();
    let selectedBook = btn.parentElement.parentElement;
    selectedBook.remove();
    let bookIndex = selectedBook.dataset.index; 
    myLibrary.splice(bookIndex , 1);
    console.log(myLibrary)
    
}


addBookBtn.addEventListener("click" , (event) => {
    event.preventDefault()

    let bookTitle = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookpages = document.querySelector("#numOfPages").value;

    // if no radio checked , radioState => "None" .
    let radioState = document.querySelector('input[name="readState"]:checked');
    if(radioState === null)
    {
        radioState = "None";
    }
    else
    {
        radioState = radioState.value
    }
    
    // Create book object
    let book = new Book(bookTitle , bookAuthor , bookpages , radioState);
    addBookToLibrary(book);
})