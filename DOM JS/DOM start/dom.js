var headerTitle = document.getElementById('header-title');
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
}