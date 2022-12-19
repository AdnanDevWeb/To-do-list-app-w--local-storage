// query selector
const listCont = document.querySelector('[data-lists]')
const listNameInput = document.querySelector('.new-list')
const form = document.querySelector('[data-new-list-form]')
const inputForm = document.querySelector('[data-new-list-input]')
const deleteListBtn = document.querySelector('.delete-list')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = listDisplayContainer.querySelector('[data-list-title]')
const listCount = listDisplayContainer.querySelector('[data-list-count]')
const tasks = listDisplayContainer.querySelector('[data-tasks]')

let LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId'
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

form.addEventListener('submit' , addList)

listCont.addEventListener('click' , e =>{
    if(e.target.tagName.toLowerCase()==='li'){
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})

deleteListBtn.addEventListener('click' , deleteList)

function deleteList(e){
    const currentList = listCont.querySelector(`[data-list-id="${selectedListId}"]`)
    const updatedArray = lists.filter(list => list.id !== selectedListId);
    lists = updatedArray;
    selectedListId = null
    saveAndRender()
    console.log(currentList);
}

function render(){

    clearElement(listCont)



    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name');
        listElement.innerText= list.name;
        listCont.appendChild(listElement)
        if(list.id === selectedListId){
            listElement.classList.add('active-list')
        }
        
    })
    
}

function saveAndRender(){
    save();
    render()
}

function save(){
    localStorage.setItem(  LOCAL_STORAGE_LIST_KEY , JSON.stringify(lists))
    localStorage.setItem(  LOCAL_STORAGE_LIST_ID_KEY , selectedListId)

}
function addList(e){


    e.preventDefault();

    if(inputForm.value === null || inputForm.value === '' || inputForm.value === ' ') return alert('type something')
    var newList = {};  
    newList['id'] = Date.now().toString();
    newList['name'] = inputForm.value;
    newList['tasks'] = [];
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
