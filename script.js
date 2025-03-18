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
