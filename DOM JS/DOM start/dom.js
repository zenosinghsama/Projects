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

var item5 = document.getElementsByClassName('list-group') ;
item5[0].style.backgroundColor = 'lightblue';

var thirdItem =document.querySelector('.list-group-item:nth-child(3)');
thirdItem.style.visibility ='hidden';

var secondItem = document.querySelectorAll('.list-group-item:nth-child(2)');
secondItem[0].style.color = 'green';

var odd = document.querySelectorAll('li:nth-child(odd)');

for(let i = 0; i < odd.length; i++){
    odd[i].style.backgroundColor = 'green';
}