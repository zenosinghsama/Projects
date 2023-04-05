var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', HandleSubmit);
// Delete event 
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);


// Add item
function addItem(e){
  e.preventDefault();

  // Get input value
  var itemName = document.querySelector('existingName').value;
  var description= document.querySelector('description').value;

  // Create new li element
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(""));
  
  // Add class
  li.className = 'list-group-item';
  li.style.display = 'flex';
  li.style.flexDirection = 'row';
  li.style.width = '100%';

  // Add text node with input value
  //li.appendChild(document.createTextNode(itemName));

  var span = document.createElement('span');
  span.innerHTML = itemName+" - "+ description;
  span.style.width = '90%';
  li.appendChild(span);


  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm pull-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  var div = document.createElement('div');
  div.style.display = 'flex'; 
  div.style.flexDirection = 'row';
  div.style.width = '10%';
  
     // Append Button to li
     div.appendChild(deleteBtn);
  
  // Create edit button
  var editBtn = document.createElement('button');
  //editBtn.innerHTML = 'Edit';

  // Add Class to EDIT
  editBtn.className = 'btn btn-primary btn-sm pull-right edit';
  editBtn.style.marginLeft = '2%';
  editBtn.appendChild(document.createTextNode('Edit'))
     
   // Append button to li
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

function HandleSubmit(e) {
  e.preventDefault()
  var sus = document.getElementById('existingName').value.toLowerCase();
  var dis = document.getElementById('description').value;
  console.log(sus)

  var Item = document.getElementsByClassName('list-group-item');
  for(let i = 0; i < Item.length; i++) {
    console.log(Item[i].childNodes[1].innerHTML)
    if(Item[i].childNodes[1].innerHTML === sus) {
      console.log("reaching",Item[i].childNodes[1].innerHTML)
      Item[i].childNodes[1].innerHTML += dis;
    }
  }
}
// Filter Items
function filterItems(e){
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  //console.log(e.target.value.toLowerCase());
  // Get lis
  var items = itemList.getElementsByTagName('li')
  // console.log(items);

  
  // Convert to an array
  Array.from(items).forEach(function(item){
    // console.log(item)
    var itemName = item.childNodes[1].innerHTML;   
    if(itemName.toLowerCase().indexOf(text) != -1){
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}