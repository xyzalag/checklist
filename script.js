
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates')
let items = JSON.parse(localStorage.getItem('items')) || [];
const clearItems = document.querySelector('#clear-items');
const checkAll = document.querySelector('#check-all');
const deleteItem = document.querySelector('.plates');
const getQuote = document.querySelector('#get-quote');

var d = new Date();
document.getElementById('list-date').innerHTML = d.toDateString();

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

items.push(item);
populateList(items, itemsList);
localStorage.setItem('items',JSON.stringify(items));
this.reset();
}

function populateList(plates = [], platesList){
platesList.innerHTML = plates.map((plate, i) => {
  return `
  <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
    <label for="item${i}">${plate.text}</label>
    <button class="delete-btn lnr lnr-trash" data-index=${i} id="delete-btn${i}"></button>
  </li>
  `;
}).join('');

}

function toggleDone(e){
  if(!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items',JSON.stringify(items));
  populateList(items, itemsList);
}

function clearList(e) {
  items = [];
  var itemsToRemove = document.querySelector('ul');
  while (itemsToRemove.hasChildNodes()) {
    itemsToRemove.removeChild(itemsToRemove.firstChild);
}
 localStorage.clear();
}

function checkList(e){
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i in checkboxes){
  checkboxes[i].checked = true;
}

localStorage.setItem('items',JSON.stringify(items));
}

function closeItem(e){
  if(!e.target.matches('button')) return;
  const el = e.target;
  const index = el.dataset.index;
  items.splice(index, 1);
  localStorage.setItem('items',JSON.stringify(items));
  populateList(items, itemsList);
}
//RANDOM QUOTE GENERATOR
var quotes = [
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
]

function generateQuote(e){
  var getNumber = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quote-display').innerHTML = quotes[getNumber];

}

//MODALS - POP UPS
var checkModal = document.getElementById('checkAll-modal');
var clearModal = document.getElementById('clearAll-modal');
var quoteModal = document.getElementById('quote-modal');

checkAll.onclick = function() {
    checkModal.style.display = "block";
}

clearItems.onclick = function() {
    clearModal.style.display = "block";
}

getQuote.onclick = function() {
    quoteModal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    checkModal.style.display= "none";
}

var span = document.getElementsByClassName("close")[1];
span.onclick = function() {
    clearModal.style.display = "none";
}

var span = document.getElementsByClassName("close")[2];
span.onclick = function() {
    quoteModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == checkModal || event.target == clearModal || event.target == quoteModal) {
        checkModal.style.display = "none";
        clearModal.style.display = "none";
        quoteModal.style.display = "none";
    };
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
deleteItem.addEventListener('click', closeItem);
clearItems.addEventListener('click', clearList);
checkAll.addEventListener('click', checkList);
getQuote.addEventListener('click', generateQuote);
