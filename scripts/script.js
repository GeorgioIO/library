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

const tempAddBtn = document.querySelector("#buttonAdd");

class Library {
  constructor() {
    this.books = this.loadBooks();
  }

  addBook(book) {
    if (!(book instanceof Book)) {
      alert("Cannot add book");
      return;
    }
    this.books.push(book);
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(this.books));
  }

  loadBooks() {
    const storedBooks = localStorage.getItem("libraryBooks");
    if (!storedBooks) return [];

    return JSON.parse(storedBooks).map(
      (bookData) =>
        new Book(
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.readState
        )
    );
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
  }
}

class Book {
  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }

  toggleReadState() {
    console.log("hello");
    if (this.readState === "Yes") {
      this.readState = "No";
    } else {
      this.readState = "Yes";
    }
  }
}

const library = new Library();
addBookToLibrary(library.loadBooks());

themeTogglers.forEach((toggler) => {
  toggler.addEventListener("click", (event) => {
    console.log(event.currentTarget);
    const selectedTheme = event.currentTarget.dataset.theme; // Get the selected theme
    console.log(`Theme selected: ${selectedTheme}`);

    themeTogglers.forEach((toggler) => {
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

showThemesBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    let panel = button.querySelector(".theme-panel");
    if (event.target.closest(".theme-panel li")) {
      return; // Stop execution to prevent panel toggling
    }

    if (panel.dataset.state === "closed") {
      panel.style.display = "block";
      panel.dataset.state = "open";
    } else {
      panel.style.display = "none";
      panel.dataset.state = "closed";
    }
  });
});

showFormBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    form.style.display = "flex";
    document.querySelector("body").classList.add("blur");
  });
});

// Event listener to hide form
hideFormBtn.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.display = "none";
  document.querySelector("body").classList.remove("blur");
});

openPanel.addEventListener("click", (event) => {
  panel.classList.remove("slidePanelBACK");
  panel.classList.add("slidePanelIN");
});

closePanel.addEventListener("click", (event) => {
  panel.classList.add("slidePanelBACK");
  panel.classList.add("slidePanelIN");
});

const myLibrary = [];

function addBookToLibrary(books) {
  mainBody.innerHTML = "";
  mainBody.append(tempAddBtn);
  let libraryLength = books.length;
  for (let i = 0; i < libraryLength; i++) {
    let bookContent = `
        <div class="body">
            <div class="title">
                <p>${books[i].title}</p>
            </div>
            <div class="author">
                <p>By ${books[i].author}</p>
            </div>
            <div class="pages">
                <p>${books[i].pages} Pages</p>
            </div>
            <div class="state">
                <p><b>Read : </b> ${books[i].readState}</p>
            </div>
        </div>
        <div class="footer">
            <button id="toggleStatebtn" onclick="toggleState(this , event)">Toggle state</button>
            <button id="deleteBookBtn" onclick="addDeleteFunctionality(this , event)">Delete</button>
        </div>
    `;
    const tempDiv = document.createElement("div");
    tempDiv.dataset.index = i;
    tempDiv.classList.add("book");
    tempDiv.innerHTML = bookContent;
    mainBody.appendChild(tempDiv);
  }
}

function addDeleteFunctionality(btn, event) {
  event.preventDefault();
  let selectedBook = btn.parentElement.parentElement;
  let selectedBookIndex = selectedBook.dataset.index;
  library.deleteBook(selectedBookIndex);
  addBookToLibrary(library.loadBooks());
}

function toggleState(btn, event) {
  event.preventDefault();
  let bookParent = btn.parentElement.parentElement;
  let bookIndex = bookParent.dataset.index;

  let book = library.books[bookIndex];

  if (book) {
    book.toggleReadState();
    library.saveBooks();

    const readState = bookParent.querySelector(".body .state p");
    readState.innerHTML = `<b>Read : </b> ${book.readState}`;
  }
}

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let bookTitle = document.querySelector("#title");
  let bookAuthor = document.querySelector("#author");
  let bookPages = document.querySelector("#numOfPages");

  // if no radio checked , radioState => "None" .
  let radioState = document.querySelector('input[name="readState"]:checked');
  if (radioState === null) {
    radioState = "None";
  } else {
    radioState = radioState.value;
  }

  if (bookTitle.value == "") {
    bookTitle.setCustomValidity("Please enter a title...");
    bookTitle.reportValidity();
    return;
  } else if (bookAuthor.value == "") {
    bookAuthor.setCustomValidity("Please enter an author name...");
    bookAuthor.reportValidity();
    return;
  } else if (bookPages.value == "") {
    bookPages.setCustomValidity("Please enter book pages...");
    bookPages.reportValidity();
    return;
  }

  // Create a book instance
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    radioState
  );

  library.addBook(book);
  console.log(library.loadBooks());
  addBookToLibrary(library.loadBooks());
});
