// async function fetchUsers() {
//     try{
//         const response = await fetch('/users');
//         const data = await response.json(); //Response Data to Json Parse
//         return data.users // User Objects Array
//     } catch(err) {
//         console.log(err);
//     }
// }

// function displayUsers(users) {
//     const userDetailsContainer = document.getElementById('userDetails');
//     userDetailsContainer.innerHTML = '';

//     const table = document.createElement('table');
//     table.classList.add('user-table');

//     const headers = ['ID', 'Name', 'Email', 'Phone Number'];
//     const headerRow = document.createElement('tr');

//     headers.forEach((header) => {
//         const th = document.createElement('th');
//         th.textContent = header;
//         headerRow.appendChild(th);
//     });

//     table.appendChild(headerRow);

//     users.forEach((user) => {
//         const row = document.createElement('tr');

//         const idCell = document.createElement('td');
//         idCell.innerHTML = user.id;
        
//         const nameCell = document.createElement('td');
//         nameCell.textContent = user.name;
        
//         const emailCell = document.createElement('td');
//         emailCell.textContent = user.email;
        
//         const phoneCell = document.createElement('td');
//         phoneCell.textContent = user.phonenumber;
        
//         row.appendChild(idCell);
//         row.appendChild(nameCell);
//         row.appendChild(emailCell);
//         row.appendChild(phoneCell);

//         table.appendChild(row);
//     });

//     userDetailsContainer.appendChild(table);
// }

// window.addEventListener('load', async() => {
//     const users = await fetchUsers();
//     displayUsers(users);
// })