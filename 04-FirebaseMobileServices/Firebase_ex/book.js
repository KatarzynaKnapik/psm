const books = document.querySelector('#books');
const form = document.querySelector('form');

function renderBook(doc){
    let ul = document.createElement('ul');
    let author = document.createElement('li');
    let genre = document.createElement('li');
    let year = document.createElement('li');
    let isbn = document.createElement('li');
    let title = document.createElement('li');

    // const s = (text) => '<span style="text-weight: 700px;">: </span>'
    ul.setAttribute('book_id', doc.id);
    author.textContent = `${doc.data().author_name} ${doc.data().author_surname}` ;
    genre.textContent = doc.data().genre;
    year.textContent = doc.data().year;
    isbn.textContent = doc.data().ISBN;
    title.textContent = doc.data().title;

    ul.classList.add('list-group');
    ul.classList.add('my-5');
    ul.style.width = "500px;";
    [author, genre, year,isbn,title].map(el => el == author ? el.classList.add('list-group-item','list-group-item-info') : el.classList.add('list-group-item')); 

    ul.appendChild(author);
    ul.appendChild(title);
    ul.appendChild(genre);
    ul.appendChild(year);
    ul.appendChild(isbn);

    books.appendChild(ul);


}  

// db.collection('books').get().then(snapshot =>{
//     snapshot.docs.forEach(doc =>{
//         renderBook(doc);
//     })
// })

form.addEventListener('submit', e =>{
    e.preventDefault();
    db.collection('books').add({
        author_name: form.name.value,
        author_surname: form.surname.value,
        title: form.title.value,
        genre: form.genre.value,
        year: form.year.value,
        ISBN: form.isbn.value
    })

    form.name.value = '';
    form.surname.value = '';
    form.title.value = '';
    form.genre.value = '';
    form.year.value = '';
    form.isbn.value = '';
})

db.collection('books').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderBook(change.doc);
        }
    })
})

