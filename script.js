// query selector
const listCont = document.querySelector('[data-lists]')
const listNameInput = document.querySelector('.new.list')
const form = document.querySelector('[data-new-list-form]')
const inputForm = document.querySelector('[data-new-list-input]')
const deleteListBtn = document.querySelector('.delete-list')


const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

form.addEventListener('submit' , addList)


function render(){

    clearElement(listCont)



    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name');
        listElement.innerText= list.name;
        listCont.appendChild(listElement)
    })
}
console.log("suuu");
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY , 0000020002                                                               ,c, ,,;,JSON.stringify(lists))
}
function addList(e){


    e.preventDefault();

    if(inputForm.value === null || inputForm.value === '') alert('type something')
    var newList = {};  
    newList['id'] = Date.now().toString();
    newList['name'] = inputForm.value,
    newList['tasks'] = []
    lists.push(newList);
    inputForm.value = ''
    render();
}
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()
