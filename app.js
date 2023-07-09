//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Show Alert
UI.prototype.showAlert = function (message, className) {
  //Create div
  const div = document.createElement("div");
  //Add Classes
  div.className = `alert ${className}`;
  //Add Text
  div.appendChild(document.createTextNode(message));
  //Get Parent
  const container = document.querySelector(".container");
  //Get Form
  const form = document.querySelector("#book-form");
  //Insert Alert
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Add Book to List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //Create tr element
  const row = document.createElement("tr");
  //Insert Cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  console.log(row);
  list.appendChild(row);
};

//Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  // console.log(book);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please fill in all Fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert("Book Added!", "success");

    //Clear Fields
    ui.clearFields();
  }

  console.log(ui);

  e.preventDefault();
});

//Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();

  //Delete Book
  ui.deleteBook(e.target);

  //Show Message
  ui.showAlert("Book Removed", "success");

  e.preventDefault;
});
