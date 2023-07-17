function addNewExpense (e) {
    e.preventDefault();

    const expenseDetails = {
        amount: e.target.amount.value,
        description: e.target.description.value,
        category: e.target.category.value,
        userId: 1
    }
    console.log(expenseDetails);

     //RETRIEVE TOKEN FROM LOCAL STORAGE
     const token = localStorage.getItem('token');
     //SEND EXPENSE DATA TO SERVER
     axios.post('/admin/add-expense',expenseDetails, { headers: { "Authorization": token } })
        .then((response) => {
            if (response.data.expense) {
                addExpensetoUI(response.data.expense);
            } else {
                throw new Error("Invalid response data format.");
            }
        }).catch(err => showError(err))
}    

    
window.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    expenseForm.addEventListener("submit", addNewExpense);
    const token = localStorage.getItem('token')
    axios.get ('http://localhost:4000/admin/expenses', { headers: { "Authorization" : token } })
    .then(response => {
        const expenseData = response.data.expense;
        console.log(response.data);
        console.log(expenseData);
        if (Array.isArray(expenseData)) {
          expenseData.forEach(expense => {
            addExpensetoUI(expense);
          });
    } else {
        showError(new Error("Invalid response data format."));
    }
})
        .catch(err => {
            showError(err)
        });
});


function addExpensetoUI (expense) {
    const parentElement = document.getElementById('listofExpenses');
    const expenseElementId = `expense - ${expense.id}`;
    parentElement.innerHTML += `
    <li id = "${expenseElementId}>
    ${expense.amount} - ${expense.description} - ${expense.category}
    </li>
    `;
}

// function deleteExpense(e, expenseid) {
//     axios.delete(`/admin/delete-expense/${expenseid}`, { headers: { "Authorization": token }}).then(() => {
//         removeExpensefromUI(expenseid);
//     })
// }

function showError(error) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = `Error: ${error.message}`;
    errorElement.style.display = 'block'
}