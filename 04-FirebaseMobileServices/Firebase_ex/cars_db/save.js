const table = document.querySelector("table");
const button = document.querySelector('button');

function renderData(doc){
    // let table = document.createElement('table');
    let tr = document.createElement('tr');
    // let td = document.createElement('td');
    let color = document.createElement('td');
    let year = document.createElement('td');
    let model = document.createElement('td');
    let brand = document.createElement('td');
    let vin = document.createElement('td');

    tr.setAttribute('car_id', doc.id);
    color.textContent = doc.data().color;
    year.textContent = doc.data().year;
    model.textContent = doc.data().model;
    brand.textContent = doc.data().brand;
    vin.textContent = doc.data().vin;

    tr.appendChild(brand);
    tr.appendChild(model);
    tr.appendChild(year);
    tr.appendChild(color);
    tr.appendChild(vin);

    table.appendChild(tr);
}

function fromJSON(){
    fetch('MOCK_DATA.json').then(response =>{
        return response.json();
    })
    .then(data=>{
        data.forEach(car =>{
            db.collection('cars').add({
                color: car.color,
                year: car.year,
                model: car.model,
                brand: car.brand,
                vin: car.VIN
            })
            .then( () => console.log('success'))
            .catch( error => console.log(error))
        })
    })
}

button.addEventListener('click', fromJSON);

db.collection('cars').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderData(change.doc);
        }
    })
})



