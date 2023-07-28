const inputElement = document.querySelector('.js-task-input');
const dateElement = document.querySelector('.js-task-date');

let toDoList = JSON.parse(localStorage.getItem('listItems')) ||[{
  task:'',
  duedate: '',
}];

let historyList = JSON.parse(localStorage.getItem('historyItems')) ||[{
  tasked: '',
  dateFinished: '',
}];

renderHistory();
renderList();

function renderList() {
  let listHTML = '';

  toDoList.forEach((listObject, index) => {
    const { task, duedate } = listObject;

    let html = `
    <div>${task}</div>
    <div>Deadline on: ${duedate}</div>
    <button class="js-delete-btn">Delete</button>
    <button class="js-done-btn">Done</button>  
    `;
    listHTML += html
    
    document.querySelector('.js-field').classList.add('todo-grid');
  });
  document.querySelector('.js-field').innerHTML = listHTML;
  
  document.querySelectorAll('.js-delete-btn').forEach((deleteElement, index) => {
    deleteElement.addEventListener('click', () => {
      toDoList.splice(index, 1);
      document.querySelector('.js-field').classList.remove('todo-grid');
      renderList();
      localStorage.setItem('listItems', JSON.stringify(toDoList));
      console.log('me');
    });
  });
  document.querySelectorAll('.js-done-btn').forEach((doneElement, index) => {
    doneElement.addEventListener('click', () => {
      itemDone();
      localStorage.setItem('historyItems', JSON.stringify(historyList));
      toDoList.splice(index, 1);
      document.querySelector('.js-field').classList.remove('todo-grid');
      renderList();
      localStorage.setItem('listItems', JSON.stringify(toDoList));
    });
  });

}

document.querySelector('.js-add-btn').addEventListener('click', () => {
  if (inputElement.value === '' && dateElement.value === '' || dateElement.value === '' || inputElement.value === '') {
    return;
  } else {
    addItem();
  }
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (inputElement.value === '' && dateElement.value === '' || dateElement.value === '' || inputElement.value === '') {
      return;
    } else {
      addItem();
    }
  }
});

function addItem() {
  const task = inputElement.value;
  const duedate = dateElement.value;

  toDoList.push({
    task,
    duedate,
  })

  inputElement.value = '';
  dateElement.value = '';

  renderList();

  localStorage.setItem('listItems', JSON.stringify(toDoList));
};

function itemDone() {
  
  const gotTask = toDoList[0];
  const gotDate = toDoList[0];

  let tasked = gotTask.task;
  let dateFinished = gotDate.duedate;

  historyList.push({
    tasked,
    dateFinished,
  });  

  renderHistory();

  localStorage.setItem('historyItems', JSON.stringify(historyList));

}; 

function renderHistory() {
  let historyHTML = '';

  historyList.forEach((historyObject, index) => {
    const { tasked, dateFinished } = historyObject;
    
    let html2 =  `
    
    <div>${tasked}</div>
    <div>Finished on: ${dateFinished}</div>
    <button class="js-second-delete-btn">Delete</button>
    `;
     historyHTML += html2;
     document.querySelector('.js-history-field').classList.add('history-field');
  });
  document.querySelector('.js-history-field').innerHTML = historyHTML;

  if (document.querySelector('.js-history-field').innerHTML = historyHTML) {
    document.querySelector('.js-heading').innerText = 'Histoire';
    document.querySelector('.js-heading').classList.add('heading');
  }
   
  document.querySelectorAll('.js-second-delete-btn').forEach((deleteElement, index) => {
    deleteElement.addEventListener('click', () => {
      historyList.splice(index, 1);
      renderHistory();
      document.querySelector('.js-history-field').classList.remove('history-field');
      document.querySelector('.js-heading').classList.remove('heading'); 
      renderHistory();
      localStorage.setItem('historyItems', JSON.stringify(toDoList));
    });
  });
};



