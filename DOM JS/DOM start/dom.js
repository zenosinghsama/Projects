/* var headerTitle = document.getElementById('header-title');
var header = document.getElementById('main-header');
header.style.borderBottom = 'solid 3px #000';

//Get Elements by class name
var items = document.getElementsByClassName('list-group-item');
console.log(items);
console.log(items[1]);



var header2 = document.getElementsByClassName('title');
for(let i = 0; i < header2.length; i++){
    header2[i].style.fontWeight = 'bold';
    header2[i].style.color = 'green';
}

var li = document.getElementsByTagName('li');
li[2].style.backgroundColor = 'green';

for(let i = 0; i < li.length; i++) {
    li[i].style.fontWeight = 'bold';
} */

/* var item5 = document.getElementsByClassName('list-group') ;
item5[0].style.backgroundColor = 'lightblue';

var thirdItem =document.querySelector('.list-group-item:nth-child(3)');
thirdItem.style.visibility ='hidden';

var secondItem = document.querySelectorAll('.list-group-item:nth-child(2)');
secondItem[0].style.color = 'green';

var odd = document.querySelectorAll('li:nth-child(odd)');

for(let i = 0; i < odd.length; i++){
    odd[i].style.backgroundColor = 'green';
} */


// TRAVERSING THE DOM
var itemlist = document.querySelector('#items');
//parentNode
/* console.log(itemlist.parentNode);
itemlist.parentNode.style.backgroundColor = '#f4f4f4'; */

// parentElement
/* console.log(itemlist.parentElement);
itemlist.parentElement.style.backgroundColor = '#f4f4f4'
console.log(itemlist.parentElement.parentElement.parentNode);
 */

// CHILDNODES
/* console.log(itemlist.childNodes); */
/* 
console.log(itemlist.children);
console.log(itemlist.children[1]);
itemlist.children[1].style.backgroundColor = 'yellow';

//FIrstCHild
//console.log(itemlist.firstChild);

//First Element Child
console.log(itemlist.firstElementChild);
itemlist.firstElementChild.textContent = 'Hello 1';

//LastElementChild
console.log(itemlist.lastElementChild);
itemlist.lastElementChild.textContent = 'Hello 4';
 */

//nextSibling
/* console.log(itemlist.nextSibling);
//nextElementSibling
console.log(itemlist.nextElementSibling); */

//previousSibling
/* console.log(itemlist.previousSibling);
//prevElementSibling
console.log(itemlist.previousElementSibling);
itemlist.previousElementSibling.style.color = 'green'; */

// create Element

//Create a div
var newDiv = document.createElement('div');

//Add Class
newDiv.className= 'hello';
//Add ID
newDiv.id='hello1';
//Add Attr
newDiv.setAttribute('title', 'Hello  Div');

//Create a text node
var newDivText = document.createTextNode('HEllo word');
//Add Text to div
newDiv.appendChild(newDivText);

var container = document.querySelector('header .container');
var h1 = document.querySelector('header h1');

var firstItem = document.querySelector('#items li:first-child');

var newListItem = document.createElement('li');
newListItem.textContent = 'HEllo word';

console.log(newDiv);

newDiv.style,fontSize = '30px';

container.insertBefore(newDiv, h1);
firstItem.parentNode.insertBefore(newListItem, firstItem);

