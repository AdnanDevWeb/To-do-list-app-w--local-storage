// query selector
const listCont = document.querySelector('[data-lists]')
const listNameInput = document.querySelector('.new.list')
const form = document.querySelector('[data-new-list-form]')
const inputForm = document.querySelector('[data-new-list-input]')
const deleteListBtn = document.querySelector('.delete-list')

const LOCAL_STORAGE_LIST_ID_KEY = "task.selectedListId"
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)


form.addEventListener('submit' , addList)
listCont.addEventListener('click', e =>{
    if(e.target.tagName === "LI"){
        console.log(e.target.dataset.listId);
        localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY,e.target.dataset.listId)
    } 
})

function render(){

    clearElement(listCont)



    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name');
        listElement.innerText= list.name;
        if(list.id === selectedListId) listElement.classList.add('active-list')
        listCont.appendChild(listElement)
    })
}
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY , JSON.stringify(lists))
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
    saveAndRender()
}

function saveAndRender(){
    save();
    render();
}
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()
