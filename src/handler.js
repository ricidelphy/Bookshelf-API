const { nanoid } = require('nanoid');
const books = require('./books');

// CREATE
const createBook = (request, h) => {

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,

    } = request.payload;

    //Variabel
    const id = nanoid(10);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    }


    try {

        if (name === undefined) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400);
        }


        if (readPage > pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }

        books.push(newBook);
        const success = books.filter((item) => item.id === id).length > 0;

        if (success) {
            const response = h.response({
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                "data": {
                    'bookId': newBook.id,
                }
            });

            response.code(201);
            return response;
        }


    } catch (error) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku",
        }).code(400);
    }

}

// LIST
const getBook = (request, h) => {
    const response = h.response({
        "status": "success",
        "data": {
            'books': books.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))
        }
    });
    return response.code(200);
}

// DETAIL
const detailBook = (request, h) => {

    const { bookId } = request.params
    const book = books.filter(item => item.id === bookId)[0];
    console.log(book);

    if (book !== undefined) {
        const response = h.response({
            "status": "success",
            "data": {
                'book': book
            }
        });
        return response.code(200);
    }

    const response = h.response({
        "status": "fail",
        "message": "Buku tidak ditemukan",
    });

    return response.code(404);
}

// UPDATE
const updateBook = (request, h) => {

    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    console.log('nama buku:' + `${name}`);

    try {
        const updatedAt = new Date().toISOString();
        const index = books.findIndex(item => item.id === bookId)


        if (!name && name != 'undefined') {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku"
            }).code(400);
        }

        if (readPage > pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }


        if (index !== -1) {

            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updatedAt
            }

            const response = h.response({
                "status": "success",
                "message": "Buku berhasil diperbarui",
            });
            return response.code(200);
        }

        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404);
    } catch (error) {

    }

}

// DELETE
const deleteBook = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex(item => item.id === bookId)

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            "status": "success",
            "message": "Buku berhasil dihapus",
        });
        return response.code(200);
    }

    return h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }).code(404);
}

module.exports = { createBook, getBook, detailBook, updateBook, deleteBook }