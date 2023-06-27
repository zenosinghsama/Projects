const displayExpense = () => {
    fetch('/expenses')
    .then((response) => response.json())
    .then((data) => {
        const expenses = data.expenses;
        const displayUi = document.getElementById('displayui');

        displayUi.innerHTML = '';

        expenses.forEach((expenses) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <p><strong>ID: </strong> ${expense.id} </p>
                <p><strong>Amount: </strong> ${expense.amount} </p>
                <p><strong>Description: </strong> ${expense.description} </p>
            `;

            displayUi.appendChild(expenseItem);
        });
    })
    .catch(err => console.log(err));
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('/add-expense', {
        method: 'POST',
        body: formData,
    })
    .then(() => {
        form.reset();
        displayExpense();
    })
    .catch((err) => console.log(err));
};

const expenseForm = document.querySelector('.expenseForm');
expenseForm.addEventListener('submit', handleFormSubmit);

displayExpense();