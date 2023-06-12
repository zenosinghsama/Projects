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

        const categories = ['food', 'bills', 'entertainment', 'transportation', 'miscellaneous'];
        const categoryLists = {};

        categories.forEach((category) => {
            categoryLists[category] = document.createElement('ul');
            const heading = document.createElement('h3');
            heading.innerHTML = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize category name
            categoryLists[category].appendChild(heading);
        });

        expenses.forEach((expense, index) => {
            const { amount, description, category } = expense;

            const li = document.createElement('li');
           // const expenseNumber = index + 1
            li.innerHTML = ` ${amount} - ${description}  `;


            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete Expense';
            deleteBtn.style.backgroundColor = 'red'; // Set background color
            deleteBtn.style.color = 'white'; // Set text color
            deleteBtn.style.border = 'none'; // Remove border
            deleteBtn.style.padding = '5px 10px'; // Adjust padding
            deleteBtn.addEventListener('click', function () {
                deleteExpense(index);
            });
            const editBtn = document.createElement('button');
            editBtn.innerHTML = 'Edit Expense';
            editBtn.style.backgroundColor = 'green'; // Set background color
            editBtn.style.color = 'white'; // Set text color
            editBtn.style.border = 'none'; // Remove border
            editBtn.style.padding = '5px 10px'; // Adjust padding
            editBtn.addEventListener('click', function () {
                editExpense(index);
            });

            li.appendChild(editBtn);
            li.appendChild(deleteBtn)

            categoryLists[category].appendChild(li);
        });

        categories.forEach((category) => {
            display.appendChild(categoryLists[category]);
        });
        // list.appendChild(li);
    }
    //display.appendChild(list);

}



displayExpenses();
