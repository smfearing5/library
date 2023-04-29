// query Selectors
const libraryTable = document.querySelector("#library");
const newBookButton = document.querySelector("#new-book-btn");
const newBookForm = document.querySelector("#new-book-form");
const addBookButton = document.querySelector("#add-book-btn");

// main
let myLibrary = [];
defaultBooks();
displayLibrary();
newBookButton.addEventListener("click", () => {
    // replace new book button with form
    newBookButton.setAttribute("class", "hidden");
    newBookForm.setAttribute("class", "");
});
// addBookButton.addEventListener("click", addBookToLibrary, false);
newBookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addBookToLibrary();
});

// functions
function defaultBooks() {
    let newBook = new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        295,
        true
    );
    myLibrary.push(newBook);

    newBook = new Book(
        "Debt of Bones",
        "Terry Goodkind",
        128,
        true
    );
    myLibrary.push(newBook);

    newBook = new Book(
        "Wizard's First Rule",
        "Terry Goodkind",
        836,
        false
    );
    myLibrary.push(newBook);

    newBook = new Book(
        "Game of Thrones",
        "George R.R. Martin",
        694,
        true
    )
    myLibrary.push(newBook);
}

function displayLibrary() {
    // clear library table
    while (libraryTable.firstChild) {
        libraryTable.removeChild(libraryTable.firstChild);
    };

    // create table headers
    let tableRow = document.createElement("tr");

    let item = document.createElement("th");
    item.textContent = "Title";
    tableRow.appendChild(item);

    item = document.createElement("th");
    item.textContent = "Author";
    tableRow.appendChild(item);

    item = document.createElement("th");
    item.textContent = "Pages";
    tableRow.appendChild(item);

    item = document.createElement("th");
    item.textContent = "Read";
    tableRow.appendChild(item);

    item = document.createElement("th");
    item.textContent = "Remove";
    tableRow.appendChild(item);

    libraryTable.appendChild(tableRow);

    // create a table entry for each book
    myLibrary.forEach((book, i, myLibrary) => {
        tableRow = document.createElement("tr");
        // tableRow.setAttribute("data-row", i);

        item = document.createElement("td");
        item.textContent = book.title;
        tableRow.appendChild(item);

        item = document.createElement("td");
        item.textContent = book.author;
        tableRow.appendChild(item);

        item = document.createElement("td");
        item.textContent = book.pages;
        tableRow.appendChild(item);

        item = document.createElement("td");
        item.textContent = book.read;
        tableRow.appendChild(item);

        item = document.createElement("button");
        item.setAttribute("type", "button")
        item.textContent = "Remove";
        item.addEventListener("click", () => removeBook(i));
        tableRow.appendChild(item);

        libraryTable.appendChild(tableRow);
    });
}

function addBookToLibrary() {
    // use form to add book to library
    let newBook = new Book(
        document.getElementById("new-book-title").value,
        document.getElementById("new-book-author").value,
        document.getElementById("new-book-pages").value,
        document.getElementById("new-book-read").checked
    );
    myLibrary.push(newBook);
    // hide the form again
    newBookForm.setAttribute("class", "hidden");
    newBookButton.setAttribute("class", "");
    displayLibrary();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

// object constructors
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readStatus;
        if (read) readStatus = "already read."
        else readStatus = "not read yet.";
        return `${title} by ${author}, ${pages} pages, ${readStatus}`; 
    };
}