const booksDB = require('./db');
const readlineSync = require('readline-sync');

const orderBookPerPage = (books) => {
    return books.sort(function(a, b){
        if(a.paginas === b.paginas){
            return a.autor.localeCompare(b.autor)
        }
        return a.paginas - b.paginas
    })
}
const changeBoolean = (books) =>
    books.map((book) => ({ ...book, recomenda: book.recomenda ? 'Sim' : 'Não', leu: book.leu ? 'Sim' : 'Não' }));

const chooseCategories = () => {
    const categories = Array.from(new Set(booksDB.map(livro => livro.categoria)));
    index = readlineSync.keyInSelect(categories, 'Qual categoria?');
    return categories[index];
};
const filterByCategory = (category) => booksDB.filter(livro => livro.categoria === category);

const searchBooks = () => {
    if (readlineSync.keyInYN('Voce deseja buscar os livros pela categoria?')) {
        const choosedCategory = chooseCategories();
        const filteredBooks = filterByCategory(choosedCategory);
        const booksFormatted = changeBoolean(filteredBooks);
        console.table(booksFormatted);
    } else {
        const orderedBooks = orderBookPerPage(booksDB)
        const booksFormatted = changeBoolean(orderedBooks);
        console.table(booksFormatted);
    }
    readlineSync.keyInYN('Deseja buscar novos livros?') ? searchBooks() : console.log('Até mais, boa leitura!');
};

let userName = readlineSync.question('Qual o seu nome?');
console.log(`Bem-vindo a minha biblioteca pessoal, ${userName}.`);
searchBooks()


