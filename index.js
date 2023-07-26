
let toDoList = JSON.parse(localStorage.getItem('listItems')) ||[{
  task:'',
  duedate: '',
}];

renderList();

function renderList() {
  let listHTML = '';

  toDoList.forEach((listObject, index) => {
    const { task, duedate } = listObject;

    let html = `
    
    <div>${task}</div>
    <div>${duedate}</div>
    <button class="js-delete-btn">Delete</button>
    
    `;
    listHTML += html
    document.querySelector('.js-field').classList.add('todo-grid');
  });
  document.querySelector('.js-field').innerHTML = listHTML;
  

  document.querySelectorAll('.js-delete-btn').forEach((deleteElement, index) => {
    deleteElement.addEventListener('click', () => {
      toDoList.splice(index, 1)
      renderList();
      localStorage.setItem('listItems', JSON.stringify(toDoList));
      console.log('me');
    });
  });
}

document.querySelector('.js-add-btn').addEventListener('click', () => {
  addItem();
});



function addItem() {
  const inputElement = document.querySelector('.js-task-input');
  const dateElement = document.querySelector('.js-task-date');
  const task = inputElement.value;
  const duedate = dateElement.value;

  toDoList.push({
    task,
    duedate,
  })

  inputElement.value = '';

  renderList();

  localStorage.setItem('listItems', JSON.stringify(toDoList));

}