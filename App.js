// Construct
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display All Books
function Display(){

}

// Display Prototype
Display.prototype.add = function(book){
  let bookList = document.getElementById('bookList');
  let tr = `
            <tr>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
            </tr>
            `;
  bookList.innerHTML += tr;
}

// Clear Form input
Display.prototype.clear = function() {
  let libraryForm = document.getElementById('libraryForm');
  libraryForm.reset();
}

// validate Check
Display.prototype.validate = function(book){
  if (book.name < 2 || book.author < 2){
    return false;
  }
  else {
    return true;
  }
}

// Error Show 
Display.prototype.show = function(info, msg){
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
