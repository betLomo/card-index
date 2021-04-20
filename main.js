function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("./index.json", function(text){
    window.books = JSON.parse(text);
});

/* Методы работы с книгам */

function showBooks() {
    var authorFilter = document.getElementById('author').value;
    var inStockFilter = document.getElementById('inStock').checked;

    if (!authorFilter && !inStockFilter) {
        return books;
    }

    var res;

    if (inStockFilter) {
        res = books.filter(function(book) {
            return book.count > 0;
        });
    }

    if (authorFilter) {
        res = books.filter(function(book) {
            return book.author.indexOf(authorFilter) > -1;
        });
    }

    return res;
}

function addBook(book) {
    books.push(book);
}

function deleteBook(book) {
    var index = books.findIndex(function(el) {
        return book.author === el.author && book.title === el.title && book.publisher === el.publisher
    });

    return books.splice(index, 1);
}




