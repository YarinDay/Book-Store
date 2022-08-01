'use strict'

const KEY = 'booksDB'
const PAGE_SIZE = 5

var gBooks
var gFilterBy = ''
var gPageIdx = 0
_createBooks()

function nextPage() {
    if (gPageIdx * PAGE_SIZE >= gBooks.length - PAGE_SIZE) return
    gPageIdx++
}

function pervPage() {
    if (gPageIdx <= 0) return
    gPageIdx--
}

function getBooksForDisplay() {
    if (gFilterBy === '') var books = gBooks
    if (gFilterBy === 'MAXPRICE') var books = gBooks.sort((a, b) => b.bookPrice - a.bookPrice)
    if (gFilterBy === 'MINRATE') var books = gBooks.sort((a, b) => a.bookRate - b.bookRate)
    if (gFilterBy === 'PRICE') var books = gBooks.sort((a, b) => b.bookPrice - a.bookPrice)
    if (gFilterBy === 'NAME') var books = gBooks.sort((a, b) => a.bookName.localeCompare(b.bookName))
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}


function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function IncreaceBookRate(book) {
    book.bookRate++
    _saveBooksToStorage()
}

function decreaseBookRate(book) {
    book.bookRate--
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice) {
    var book = _createBook(bookName, bookPrice)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => bookId === book.id)
    book.bookPrice = newPrice
    _saveBooksToStorage()
    return book
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function _createBooks() {
    var books = loadFromStorage(KEY)

    if (!books || !books.length) {
        books = [
            _createBook('Who Moved My Cheese?', 120, '../img/WhoMovedMyCheese.jpg'),
            _createBook('Diary of a Wimpy Kid', 80, '../img/DiaryofaWimpyKid.jpg'),
            _createBook('Shrek!', 100, '../img/Shrek.jpg')
        ]
    }

    gBooks = books
    _saveBooksToStorage()
}

function _createBook(bookName, bookPrice, img = '../img/no-image.jpg', bookRate = 0) {
    var book = {
        id: makeId(),
        bookName: bookName,
        bookPrice: bookPrice,
        bookImg: img,
        bookRate: bookRate
    }
    return book
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

