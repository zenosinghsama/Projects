let expenses = [];

function AddExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const expense = { amount, description, category };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();   
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
 
}


function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('amount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function displayExpenses() {
    const display = document.getElementById('displayui');
    display.innerHTML = '';
    const expensesData = localStorage.getItem('expenses');
    if (expensesData) {
        expenses = JSON.parse(expensesData);
        const list = document.createElement('ul');
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            const li = document.createElement('li');
            li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete Expense';
            deleteBtn.addEventListener('click', function() {
                deleteExpense(i);
            });
            const editBtn = document.createElement('button');
            editBtn.innerHTML = 'Edit Expense';
            editBtn.addEventListener('click', function() {
                editExpense(i);
            });
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        }
        display.appendChild(list);
    }
}

displayExpenses();
