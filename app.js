
let m = 'mata';
localStorage.getItem('assigments', JSON.stringify(m));

const ul = document.querySelector('.parinte-liste');

// functie pentru a golid inputul cand dai click in casuta lui
document.querySelector('.aici-scrii').addEventListener('click', function(object){
    document.querySelector('.aici-scrii').value = '';
});



// functie pentru a adauga un nou elment ce se activeaza cand dai submit form 
document.querySelector('form').addEventListener('submit', function (object) { // dupa submit
    const newDeleteButton = document.createElement('a');    // creeaza un a
    newDeleteButton.classList.add('sterge');    // adauga-i clasa sterge
    newDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    const newListItem = document.createElement('li');   // cream un nou element de tip li
    newListItem.classList.add('lista-copil');   // ii adaugam clasa lista-copil
    
    const inputValue = document.querySelector('.aici-scrii').value;
    newListItem.innerHTML = inputValue;    // valoarea din 'aici-scrii' (uita-te in html) e introduse in newListITem
    
    newListItem.appendChild(newDeleteButton);   // dupa ce am introdus valoarea inputului in noul element, adaugam si butonul de stergere
    ul.appendChild(newListItem);    // noul element este adaugat in lista

    
    console.log(newListItem);   // afisam elementul nou creat, in consola

    object.preventDefault();    // oprin pagina din a-si da realod 
});



 // functia pentru a adauga elemenetele in local storage
 document.querySelector('form').addEventListener('submit', function(object) { // seactiveaza cand dam submit
    const getInputValue = document.querySelector('.aici-scrii').value; // pointam catre valoarea din submit
    
    let tasksArray;

    if (localStorage.getItem('assigments') === null) {   // daca in local storage nu se gaseste "key-ul" assigments
        tasksArray = [];    // atunci tasksArray devin un array
        console.log(`se creeaza un array`);
    }
    else    // daca e ceva in local storage
    {
        tasksArray = JSON.parse(localStorage.getItem('assigments')); //acel ceva fa-l din String in ce era inainte
    }

    tasksArray.push(getInputValue); // adauga ca ultim element valoarea din get input value

    localStorage.setItem('assigments', JSON.stringify(tasksArray)); // array-ul tasksArray e bagat in local storage ca string, cu key-ul assigments

    document.querySelector('.aici-scrii').value = ''; // dupa ce bagal vlorile in local storage, curatam inputul

    object.preventDefault();
 });


 getElementsFromLocalStorage();
 // functia pentru a citi si afisa ce e in local sorage
 function getElementsFromLocalStorage() {
    let arr = JSON.parse(localStorage.getItem('assigments')); 
    for (let i = 0; i < arr.length; i++) {

        const newDeleteButton = document.createElement('a');    // creeaza un a
        newDeleteButton.classList.add('sterge');    // adauga-i clasa sterge
        newDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        const newListItem = document.createElement('li');   // cream un nou element de tip li
        newListItem.classList.add('lista-copil');   // ii adaugam clasa lista-copil
        
        const inputValue = arr[i];
        newListItem.innerHTML = inputValue;  
        // valoarea din 'aici-scrii' (uita-te in html) e introduse in newListITem
        
        newListItem.appendChild(newDeleteButton);   // dupa ce am introdus valoarea inputului in noul element, adaugam si butonul de stergere
        ul.appendChild(newListItem);    // noul element este adaugat in lista
    }
}




// sterge elementul din UI
document.querySelector('body').addEventListener('click', function (object) {
    if (object.target.parentElement.classList.contains('sterge')){
        object.target.parentElement.parentElement.remove();
        removeTaksFromLocalStorage(object.target.parentElement.parentElement);  // setergem elementul din local storage
    }
});


function removeTaksFromLocalStorage(taskItem) {
    let tasks;  // cream variabila tasks
    if(localStorage.getItem('assigments') === null){   // daca in local storage nu e nico "key" numita assigments
        tasks = []; // tasks devine array
    }
    else    // daca totusi e ceva in local sorage
    {   // tasks ia toate valorile din local sorage
        tasks = JSON.parse(localStorage.getItem('assigments'));
    }
    // trecem prin toate elementele din tasks
    for (let i = 0; i < tasks.length; i++) {
        if (taskItem.textContent == tasks[i]) { // daca continutul elementului pe care am dat click e la fel cu un element din tasks
            tasks.splice(i, 1)   // acel element e sters
        }
    }    
    localStorage.setItem('assigments', JSON.stringify(tasks)); // ce a ramas din array-ul tasks e reintrodus in local storage
}



// remove all elements from the local storage
document.querySelector('.btn-clear-tasks').addEventListener('click', function (object){
    console.log("clear all tasks");

    let taskListItems; 

    if(localStorage.getItem('assigments') === null){   // daca in local storage nu e nico "key" numita assigments
        taskListItems = []; // taskListItems devine array gol
    }
    else    // daca totusi e ceva in local sorage
    {   // taskListItems ia toate valorile din local sorage
        taskListItems = JSON.parse(localStorage.getItem('assigments'));
    }

    // cat timp exista un prim element  
    while (taskListItems[0] != null) {         
        taskListItems.splice(0, 1); // sterge primul element        
    }

    // baga lista taskListItem, ce acum este goala, din nou in local storage pe 'key-ul' assigments, astfel rescriind local storage
    localStorage.setItem('assigments', JSON.stringify(taskListItems));

    // Stergem toate elementele din UI
    let ul = document.querySelector('.parinte-liste');
    
    // cat timp exista un prim element 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);  // sterge primul element  
    }
  
    object.preventDefault();
});



// filter tasks
document.querySelector('.filter-tasks').addEventListener('keyup', function(object) {
    // vloarea locului de unde scriem o transofrmam in lower case
    const text = object.target.value.toLowerCase();

    // selecteaza toate elementele ce au calsa lista-copi
    // pentru fiecare elment fa ce e in forEach
    document.querySelectorAll('.lista-copil').forEach(function(object){
        const item = object.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            object.style.display = 'flex';
        }
        else 
        {
            object.style.display = 'none';
        }

        console.log(item);
    });
});

document.querySelector('.filter-tasks').addEventListener('click', function(object) {
    document.querySelector('.filter-tasks').value = '';
});