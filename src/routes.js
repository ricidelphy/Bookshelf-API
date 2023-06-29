
const { createBook, getBook, detailBook, updateBook, deleteBook  } = require("./handler");


const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: createBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBook
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: detailBook
    },
    
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook
    },

    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];

module.exports = routes;