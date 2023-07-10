// // main.js
// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('.expenseForm').addEventListener('submit', function(event) {
//       event.preventDefault(); // Prevent the default form submission
  
//       const form = event.target;
//       const formData = new FormData(form);
  
//       fetch('/admin/add-expense', {
//         method: 'POST',
//         body: formData
//       })
//         .then(response => {
//           if (response.ok) {
//             return response.json(); // Parse the response as JSON
//           } else {
//             throw new Error('Failed to add expense'); // Throw an error if the response is not OK
//           }
//         })
//         .then(expense => {
//           // Update the DOM with the newly created expense
//           const displayUi = document.getElementById('displayui');
//           const expenseElement = document.createElement('div');
//           expenseElement.textContent = `Expense: ${expense.amount} - ${expense.detail}`;
//           displayUi.appendChild(expenseElement);
  
//           // Reset the form
//           form.reset();
//         })
//         .catch(error => {
//           console.error(error);
//           // Handle error scenario
//         });
//     });
//   });
  
  
  










// // const displayExpense = () => {
// //     fetch('/expenses')
// //         .then((response) => response.json())
// //         .then((data) => {
// //             const expenses = data.expenses;
// //             const displayUi = document.getElementById('displayui');

// //             displayUi.innerHTML = '';

// //             expenses.forEach((expense) => {
// //                 const expenseItem = createExpenseItem(expense);

// //                 displayUi.appendChild(expenseItem);
// //             });
// //         })
// //         .catch(err => console.log(err));
// // };

// // const createExpenseItem = (expense) => {
// //     const expenseItem = document.createElement('div');
// //     expenseItem.classList.add('expense-item');
// //     expenseItem.innerHTML = `
// //                 <p><strong>ID: </strong> ${expense.id} </p>
// //                 <p><strong>Amount: </strong> ${expense.amount} </p>
// //                 <p><strong>Description: </strong> ${expense.description} </p>
// //             `;

// //     return expenseItem;
// // };

// // const handleFormSubmit = (event) => {
// //     event.preventDefault();

// //     const form = event.target;
// //     const formData = new FormData(form);

// //     const rawAmount = formData.get('amount');
// //     const amount = parseFloat(rawAmount.replace(/,/g, ''));

// //     if (isNaN(amount) || amount <= 0) {
// //         console.log('Invalid amount provided');
// //         return;
// //     }

// //     const expense = {
// //         amount: amount,
// //         description: formData.get('description')
// //     };

// //     fetch('/add-expense', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(expense)
// //     })
// //         .then(response => response.json())
// //         .then(data => {
// //             if (data.error) {
// //                 console.log(data.error);
// //                 return;
// //             }

// //             const expenseItem = document.createElement('div');
// //             expenseItem.classList.add('expense-item');
// //             expenseItem.innerHTML = `
// //                 <p><strong>ID: </strong> ${data.id} </p>
// //                 <p><strong>Amount: </strong> ${data.amount} </p>
// //                 <p><strong>Description: </strong> ${data.description} </p>
// //             `;

// //             const displayUi = document.getElementById('displayui');
// //             displayUi.appendChild(expenseItem);
// //         })
// //         .catch(err => console.log(err));
// // };


// // const expenseForm = document.querySelector('.expenseForm');
// // expenseForm.addEventListener('submit', handleFormSubmit);

// // displayExpense();
