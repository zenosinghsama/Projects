var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', onSubmit);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

// Add item
function onSubmit(e){
  e.preventDefault();

  // Get input value
  var newItem = document.getElementById('item').value;
  var descriptionItem = document.getElementById('description').value;

  // Create new li element
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(""));
  // Add class
  li.className = 'list-group-item';
  li.style.display = 'flex';
  li.style.flexDirection = 'row';
  li.style.width = '100%';
  // Add text node with input value

  var span = document.createElement('span');
  span.style.width = '90%';
  span.innerHTML=newItem+" "+descriptionItem
  li.appendChild(span);

  // const newText = document.createTextNode(newItem)
  // const descriptionNode = document.createTextNode(" " + descriptionItem)

  // li.appendChild(newText);
  // li.appendChild(descriptionNode);

  // Create del button element
  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');
  

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm pull-right delete';
  editBtn.className = 'btn btn-primary btn-sm pull-right editBtn';
 

  // Append text node
  var div = document.createElement('div');
  div.style.display = 'flex'; 
  div.style.flexDirection = 'row';
  div.style.width = '10%';


  deleteBtn.appendChild(document.createTextNode('X'));


  editBtn.className = 'btn btn-primary btn-sm pull-right edit';
  editBtn.style.marginLeft = '2%';
  editBtn.appendChild(document.createTextNode('Edit'));


  // Append button to li
  div.appendChild(deleteBtn);
  div.appendChild(editBtn);


  li.appendChild(div);

  // Append li to list
  itemList.appendChild(li);
}

// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement.parentElement;
      itemList.removeChild(li);
    }
  }
}

//Add Description
function addDescription(e){
  e.preventDefault();
  var itemAdd = document.getElementById('item').value.toLowerCase();
  var DisItem = document.getElementById('description').value;

  var AnITem = document.getElementsByClassName("list-group-item");
  for(let i = 0; i < AnITem.length; i++) {
    if(AnITem[i].childNodes[0].textContent.toLocaleLowerCase() === itemAdd) {
      AnITem[i].childNodes[1].textContent = " " +  DisItem;
      return;
    }
  }
}
// Filter Items
function filterItems(e){
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function(item){
    var itemName = item.firstChild.textContent;
    const description = item.childNodes[1].textContent;
    if(itemName.toLowerCase().indexOf(text) != -1 || description.toLowerCase().indexOf(text) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}