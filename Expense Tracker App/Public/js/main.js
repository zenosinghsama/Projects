document.getElementById("expenseForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    if (category != "chooseOne" && name.length > 0 && price > 0) {
        const expenseDetails = {
            amount,
            description,
            category,
            userId: 1,
          };

          try {
            //RETRIEVE TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem("token");
            //SEND EXPENSE DATA TO SERVER
            const response = await fetch ("/admin/add-expense", {
                expenseDetails,
                headers: { 
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseDetails),
            });
              const data = await response.json();
              if(response.ok) {
                ShowExpense();
                document.getElementById("expenseForm").reset();
              } else {
                console.log("Failed to Add Expense", data.error);
              }
  } catch (err) {
    console.log(err);
  }
}
});

const ShowExpense = async () => {
   try {
    const token = localStorage.getItem("token");
    const response = await fetch("/admin/expenses", {
        headers: { "Authorization": token}
    });
    const data = await response.json();

    if(response.ok) {
        const expenses = data.allExpenses;
        const list = document.getElementById("expenseList");
        list.innerHTML = "";

        for(let i = 0; i < expenses.length; i++) {
            list.innerHTML += `
            <div>
                <span><b>Amount:</b> ${expenses[i].amount}</span>
                <span><b>Description:</b> ${expenses[i].description}</span>
                <span><b>Category:</b> ${expenses[i].category}</span>
            </div>
            `;
        }
    } else {
        console.log("No Expenses Found");
    }
   } catch(err) {
    console.log(err);
   }
};

ShowExpense();
