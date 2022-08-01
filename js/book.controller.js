'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var table = document.querySelector('.table-container')
    var books = getBooksForDisplay()
    var strHTML = ''
    strHTML += `<thead class="table-head"> <tr> <th>Book ID</th> <label ><th onclick = "onSetSortBy('NAME')"> Book Name </th></label>
    <label><th onclick = "onSetSortBy('PRICE')"> Book Price </th> </label><th> Book image </th><th> Action</th></tr> </thead> <tbody class = "table-body"  `

    books.forEach(book => {
        strHTML += `<tbody class="table-body"> <tr class="${book.id}"> 
        <td> ${book.id} </td> <td> ${book.bookName} 
        </td> <td> ${book.bookPrice}&#8364;</td> <td> 
        <div class="book-image-container"> <img src=${book.bookImg}
         alt="img"> </div> </td><td><div class="actions">
        <button onclick = "onUpdateBook('${book.id}')">Update</button>
        <button onclick = "onRemoveBook('${book.id}')">Delete</button>
        <button onclick = "onReadBook('${book.id}')">Read
        </button></div> </tr> `

    })
    strHTML += `</tbody>`

    table.innerHTML = strHTML



}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onReadBook(bookId) {
    console.log(bookId);
    const book = getBookById(bookId)
    console.log(book);
    const elModal = document.querySelector('.modal')
    const elRate = document.querySelector('.rate-the-book')
    elModal.querySelector('h2').innerText = 'Book Name: ' + book.bookName
    elModal.querySelector('h3').innerText = 'Book Price: ' + book.bookPrice + ' euro'
    elModal.classList.add('open')

    var strHTML = `<button onclick="onDecreaseRate('${bookId}')">-</button>
    <h5 class="book-rate">${book.bookRate}</h5>
    <button onclick="onIncreaseRate('${bookId}')">+</button>`
    console.log(strHTML);
    elRate.innerHTML = strHTML

}

function onIncreaseRate(bookId) {
    var book = getBookById(bookId)
    console.log(book);
    if (book.bookRate === 10) return
    IncreaceBookRate(book)
    bookRating(book.bookRate)
}

function onDecreaseRate(bookId) {
    var book = getBookById(bookId)
    if (book.bookRate === 0) return
    decreaseBookRate(book)
    bookRating(book.bookRate)
}

function bookRating(bookRate) {
    var rate = document.querySelector('.book-rate')
    rate.innerText = bookRate
}

function onSetSortBy(filterBy) {
    console.log(filterBy);
    setFilter(filterBy)
    renderBooks()
}

function onAddBook() {
    const addBookName = document.querySelector('.input-book-name')
    // const addBookName = prompt(`Enter the book\'s name`)
    const addBookPrice = document.querySelector('.input-book-price')
    // const addBookPrice = +prompt(`Enter the book\'s price`)
    // if (!addBookPrice) {
    //     alert('Please enter a number')
    //     return
    // }
    if (!addBookPrice.value) return
    addBook(addBookName.value, addBookPrice.value)
    renderBooks()
    addBookName.value = ''
    addBookPrice.value = ''
}



function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId)
    const newPrice = +prompt('Price?', book.bookPrice)
    if (newPrice && book.bookPrice !== newPrice) {
        book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.bookPrice} euro`)
    }
}

function onPrevPage() {
    pervPage()
    renderBooks()
}

function onNextPage() {
    nextPage()
    renderBooks()
}
