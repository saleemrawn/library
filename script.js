const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title = "", author = "", pages = 0, hasRead = false) {
  const book = new Book(title, author, pages, hasRead);
  myLibrary.push(book);
}

function addBooksToDOM() {
  const libraryContainer = document.querySelector(".library-container");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    libraryContainer.insertAdjacentHTML(
      "beforeend",
      `<div class=".card" data-book-id="${book.id}">
        <p class="book-title">${book.title}</p>
        <p class="book-author">${book.author}</p>
        <p class="book-pages">${book.pages}</p>
        <button class="status-btn">${book.hasRead === false ? "Not Read" : "Read"}</button>
        <button class="remove-btn">Remove</button>
      </div>`
    );
  });
}

function showModal() {
  const addBookDialog = document.querySelector(".add-book-dialog");
  addBookDialog.showModal();
}
