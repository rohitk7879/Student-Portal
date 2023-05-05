const url = `https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json`

//loading data in table

let tableBody = document.querySelector("tbody");

function appendTableRows(element, body){
    const tableRow = document.createElement("tr");

    //append student id
    const id = document.createElement("td");
    id.innerText = element.id;
    tableRow.appendChild(id);

    //append student photo first + last name
    const name = document.createElement('td');
    const image = document.createElement('img')
    image.src = element.img_src;
    name.appendChild(image);
    const span = document.createElement('span')
    
    span.innerText =`${element.first_name} ${element.last_name}`;
    name.appendChild(span);
    tableRow.appendChild(name);
    console.log(name);

    //append student gender
    const gender = document.createElement('td');
    gender.innerText = element.gender;
    tableRow.appendChild(gender);

    //append student class
    const classes = document.createElement("td");
    classes.innerText = element.class;
    tableRow.appendChild(classes);

    //append student marks
    const mark = document.createElement("td");
    mark.innerText = element.marks;
    tableRow.appendChild(mark);

    //append student passing
    const passing = document.createElement("td");
    passing.innerText = element.passing;
    tableRow.appendChild(passing);

    //append student email

    const email = document.createElement("td");
    email.innerText = element.email;
    tableRow.appendChild(email);

    body.appendChild(tableRow);
}
function appendDataOnUI(data){
    tableBody.innerHTML = '';
    data.forEach((element) => {
        appendTableRows(element, tableBody)
    });
}

async function loadTable(){
    let data;
    try{
        const response = await fetch(url);
        data = await response.json();
    }catch(e){
        console.log(e);
    }
    console.log(data);
    appendDataOnUI(data);
}
loadTable();

// sorting features
const btns = document.querySelectorAll(".sort > button")
function sort(base, sorttable){
    sorttable.sort((x,y) =>{
        if(x[1][base] < y[1][base]){
            return -1;
        }
        if(x[1][base]> y[1][base]){
            return 1;
        }
        return 0;
    })
}
async function sorting(sortBase){
    let data;
    try{
        const response = await fetch(url);
        data = await response.json();
    } catch (e){
        console.log(e);
    }
    let sortable = [];
    for(let obj in data){
        sortable.push([obj, data[obj]]);
    }
    if(sortBase === "top"){
        sort("first_name", sortable);
    }
    else if(sortBase === "bottom"){
        sort("first_name", sortable);
        sortable.reverse();
    }
    else if (sortBase === "marks"){
        sort("marks", sortable);
    }
    else if (sortBase === "passing") {
        sort("passing", sortable);
    } else if (sortBase === "class") {
        sort("class", sortable);
    } else if (sortBase === "gender") {
        sort("gender", sortable);
    }
    tableBody.innerHTML = '';
    sortable.forEach((element) =>{
        appendTableRows(element[1], tableBody);
    });
}
btns.forEach(element =>{
    element.addEventListener("click", ()=>{
        sorting(element.dataset.sort);
    });
})

//searching features

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

async function loadData(searchString){
    tableBody.innerHTML = '';
    let data;
    try {
        const response = await fetch(url);
        data = await response.json();
    } catch (e){
        console.log(e);
    }
    data.forEach((element) =>{
        if (element.first_name.toLowerCase().includes(searchString) || element.last_name.toLowerCase().includes(searchString) || element.email.toLowerCase().includes(searchString)) {
            appendTableRows(element, tableBody);
        }
    });
}
searchBar.addEventListener("change", (event) =>{
    const searchString = event.target.value;
    loadData(searchString.toLowerCase());
});
searchBtn.addEventListener("click", () =>{
    loadData(searchBar.value)
});
