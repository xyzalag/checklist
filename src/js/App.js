// Get a date
const d = new Date();
document.getElementById('list-date').innerHTML = d.toDateString();

const createModal = (modal) => {
  modal.style.display = 'block'; 

  window.onclick = (e) => {
      if (e.target == modal || e.target.matches('span')) {
        modal.style.display = 'none'; // hide modal 
      }
    }
};

const checkListController = (function() {

  const elementsUI = {
    addItemsBtn: document.querySelector('.add-items'),
    itemsList: document.querySelector('.tasks'),
    removeAllBtn: document.querySelector('#clear-items'),
    removeAllModal: document.getElementById('clearAll-modal'),
    checkAllBtn: document.querySelector('#check-all'),
    checkAllModal: document.getElementById('checkAll-modal'),
    counter: document.querySelector('.task-counter')
  };

  let items = JSON.parse(localStorage.getItem('items')) || [];

  // addr  tasks to the list and local storage
  function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };

    items.push(item);
    updateList(items);
    this.reset();
  };

  // add task to the UI
  function populateList(tasks = [], tasksList){
    tasksList.innerHTML = tasks.map((task, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''} />
        <label for="item${i}" class=${task.done ? 'done' : ''}>${task.text}</label>
        <button class="delete-btn lnr lnr-trash" data-index=${i} id="delete-btn${i}"></button>
      </li>
      `;
    }).join('');
  };

  // check task
  function toggleDone(e){
    //if(!e.target.matches('input')) return;
    if (e.target.matches('input')) {
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      updateList(items);
    } else if (e.target.matches('.delete-btn')) {
      removeItem(e);
    }
  };

  // remove task
  function removeItem(e){
    const el = e.target;
    const index = el.dataset.index;
    items.splice(index, 1);
    updateList(items)
  };

  // remove all the tasks
  function removeAll(e) {
    items = [];
    while (elementsUI.itemsList.hasChildNodes()) {
      elementsUI.itemsList.removeChild(elementsUI.itemsList.firstChild);
    };
    updateList(items);
    createModal(elementsUI.removeAllModal);
  };

  // check all the tasks
  function checkAll(e){
    items.forEach((e) => e.done = true);
    updateList(items, elementsUI.itemsList);
    createModal(elementsUI.checkAllModal);
  };

  // task counter
  function taskCounter(tasksArr) {
    let countDone = 0;
    tasksArr.forEach((e) => {
      if (e.done === true) countDone++;
    });
    elementsUI.counter.innerText = `${countDone}/${tasksArr.length} completed`;
  };

  // display the button only if the list is not empty
  function toggleButtons(items, btnEl, btnFn) {
    if (items.length !== 0) { 
      btnEl.style.display = 'inline-block';
      btnEl.addEventListener('click', btnFn);
    } else {
      btnEl.style.display = 'none';
    }
  };

  function updateList(items) {
    populateList(items, elementsUI.itemsList);
    localStorage.setItem('items',JSON.stringify(items));
    taskCounter(items);
    toggleButtons(items, elementsUI.removeAllBtn, removeAll);
    toggleButtons(items, elementsUI.checkAllBtn, checkAll);
  };

  //  INIT 
  elementsUI.addItemsBtn.addEventListener('submit', addItem);
  elementsUI.itemsList.addEventListener('click', toggleDone);
  updateList(items);
})();

const quoteGenerator = (function() {

  const quotes = [
  'Succes is a series of small wins.',
  'Wake up with determination. Go to bed with satisfaction.',
  'If you get tired, learn to REST, not to quit!',
  'Everything you do now is for your future. Think about that…',
  'Just….. DO IT!!!!!!!!!!!!!!!!',
  'The difference between who you are and who you want to be is WHAT YOU DO….',
  'Lack of direction, not lack of time, is the problem. We all have twenty-four hour day.',
  'A little progress each day adds up to BIG results.',
  'Either you run the day, or the day runs you…',
  'There are seven days in the week and SOMEDAY isn\’t one of them.',
  'There are only two options: make progress or make excuses.',
  'Be stubborn about your  goals and flexible about your methods.',
  'The best way to get things done is to simply BEGIN.',
  'Discipline is the bridge between goals and results.',
  'Do something instead of killing time because time is killing you … by Paulo Coelho. No joke :D',
  'You are what you do, not what you say you\’ll do'
];

  const getQuote = document.getElementById('get-quote');

  getQuote.addEventListener('click', e => {

    createModal(document.querySelector('.quote-modal'));
    let getNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quote-display').innerHTML = quotes[getNumber];

  });

})();
