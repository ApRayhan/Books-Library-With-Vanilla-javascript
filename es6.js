loadBooks();
// Construct
class Book {
  constructor (name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// Display All Books
class Display {
  // Add Method
  add(book){
    let books = localStorage.getItem('books');
    let allBooksList;
    if (books == null){
      allBooksList = [];
    }
    else {
      allBooksList = JSON.parse(books);
    }
    const newBook = {
      name: book.name,
      author: book.author,
      type: book.type
    }
    allBooksList.push(newBook);
    localStorage.setItem('books', JSON.stringify(allBooksList));
    loadBooks();
  }

  // clear Method
  clear() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
  }

  // Validate Method
  validate(book){
    if (book.name < 2 || book.author < 2){
      return false;
    }
    else {
      return true;
    }
  }

  // Show Method
  show(info, msg){
    let messages = document.getElementById('message');
    let alert = `
              <div class="alert alert-${info} alert-dismissible fade show" role="alert">
                <strong>${info} !</strong> ${msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              `;
    messages.innerHTML = alert;
    setInterval(() => {
      messages.innerHTML = '';
    }, 5000);
  }


}
// Load All Books
function loadBooks(){
    let books = localStorage.getItem('books');
    let allBooksList;
    if (books == null){
      allBooksList = [];
    }
    else {
      allBooksList = JSON.parse(books);
    }
    let bookList = document.getElementById('bookList');
    let tr = "";
    allBooksList.forEach(function(element, index){
      tr += `
              <tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button type="button" onclick="deleteFn(${index})">Delete</button></td>
              </tr>
              `;
    })
    if (allBooksList != null){
      bookList.innerHTML = tr;
    }
  
}

// Delete Book
function deleteFn(id){
  let books = localStorage.getItem('books');
    let allBooksList;
    if (books == null){
      allBooksList = [];
    }
    else {
      allBooksList = JSON.parse(books);
    }
    allBooksList.splice(id, 1);
    localStorage.setItem('books', JSON.stringify(allBooksList));
    loadBooks();
}

// Form Submit
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
  e.preventDefault();
  let name = document.getElementById('bookName').value;
  let author = document.getElementById('bookAuthor').value;
  let type;


  let bangla = document.getElementById('bangla');
  let english = document.getElementById('english');
  let arabic = document.getElementById('arabic');

  if (bangla.checked){
    type = bangla.value;
  }
  else if (english.checked){
    type = english.value;
  }
  else if (arabic.checked){
    type = arabic.value;
  }


  let book = new Book(name, author, type);
  let display = new Display();
  if (display.validate(book)){
    display.add(book);
    display.show('success', 'Date added successfully');
    display.clear();
  }
  else {
    display.show('danger', 'Please enter a valid Data ...');
  }
}
