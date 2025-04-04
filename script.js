const myLibrary = [];

class Book {
  #id;
  #title;
  #author;
  #pages;
  #hasRead;

  constructor(title, author, pages, hasRead) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#hasRead = hasRead;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get hasRead() {
    return this.#hasRead;
  }

  set hasRead(status) {
    if (typeof status !== "boolean") {
      throw new Error(`Invalid argument: expected boolean, received ${status}`);
    }

    return (this.#hasRead = status);
  }
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
      `<div class="card" data-book-id="${book.id}">
          <div class="card-info">
            <p class="book-title">${book.title}</p>
            <p class="book-author">${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
          </div>
          <div class="card-buttons">
            <button class="status-btn primary-btn" data-read-status="${book.hasRead}">${
        book.hasRead === false ? "Mark as Read" : "&#x2714; Read"
      }</button><button class="remove-btn warning-btn">&#x2718; Remove</button>
          </div>
      </div>`
    );
  });

  updateReadStatus();
  attachRemoveBookEventListener();
  attachReadStatusEventListener();
}

function attachRemoveBookEventListener() {
  const removeBtns = document.querySelectorAll(".remove-btn");

  removeBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parent = event.target.parentElement.parentElement;
      const bookID = parent.getAttribute("data-book-id");

      if (window.confirm("Are you sure you want to delete this book?")) {
        myLibrary.forEach((book) => {
          if (book.id === bookID) {
            const index = myLibrary.indexOf(book);

            myLibrary.splice(index, 1);
            parent.remove();
          }
        });
      }
    });
  });
}

function attachReadStatusEventListener() {
  const statusBtns = document.querySelectorAll(".status-btn");

  statusBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parent = event.target.parentElement.parentElement;
      const bookID = parent.getAttribute("data-book-id");

      myLibrary.forEach((book) => {
        if (book.id === bookID && book.hasRead === false) {
          book.hasRead = true;
          updateButtonToRead(event.target);
          return;
        }

        if (book.id === bookID && book.hasRead === true) {
          book.hasRead = false;
          updateButtonToNotRead(event.target);
          return;
        }
      });
    });
  });
}

function updateButtonToRead(button) {
  button.classList.add("read");
  button.setAttribute("data-read-status", "true");
  button.innerHTML = "&#x2714; Read";
}

function updateButtonToNotRead(button) {
  button.classList.remove("read");
  button.setAttribute("data-read-status", "false");
  button.innerHTML = "Mark as Read";
}

function updateReadStatus() {
  const statusBtn = document.querySelectorAll(".status-btn");
  statusBtn.forEach((button) => {
    if (button.getAttribute("data-read-status") === "true") button.classList.add("read");
  });
}

function showModal() {
  const addBookDialog = document.querySelector(".add-book-dialog");
  addBookDialog.showModal();
}

function closeModal() {
  const addBookDialog = document.querySelector(".add-book-dialog");
  addBookDialog.close();
}

function resetForm() {
  const addBookForm = document.querySelector(".add-book-form");
  addBookForm?.reset();
}

function attachEventListeners() {
  const addBookBtn = document.querySelector(".add-book-btn");
  const addBookForm = document.querySelector(".add-book-form");
  const cancelBtn = document.querySelector(".cancel-btn");

  addBookBtn.addEventListener("click", () => {
    showModal();
  });

  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addBookForm);
    addBookToLibrary(
      formData.get("title"),
      formData.get("author"),
      formData.get("pages"),
      formData.get("hasRead") === "no" ? false : true
    );

    addBooksToDOM();
    resetForm();
    closeModal();
  });

  cancelBtn.addEventListener("click", () => {
    resetForm();
    closeModal();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  attachEventListeners();
});
