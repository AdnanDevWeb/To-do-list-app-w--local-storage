// query selector
const listCont = document.querySelector('[data-lists]')
const listNameInput = document.querySelector('.new.list')
const form = document.querySelector('[data-new-list-form]')
const inputForm = document.querySelector('[data-new-list-input]')
const deleteListBtn = document.querySelector('.delete-list')

let LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId'
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

form.addEventListener('submit' , addList)

listCont.addEventListener('click' , e =>{
    let target = e.target.dataset.listId;
    localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY , target)
})

function render(){

    clearElement(listCont)



    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name');
        listElement.innerText= list.name;
        listCont.appendChild(listElement)

        if(list.id === selectedListId){
            list.classList.add('active-list')
        }
    })
}

function saveAndRender(){
    save();
    render()
}

function save(){
    localStorage.setItem(  LOCAL_STORAGE_LIST_KEY , JSON.stringify(lists))
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
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()
