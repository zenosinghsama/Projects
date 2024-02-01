// Chat.js
// get command
fs.readFile('message.txt', {encoding: 'utf-8'}, (err,data) => {
   if (err) {
       console.log(err);
   }
   console.log('data from file ' + data);

   // Post
router.post('/', (req, res, next) => {
   const username = req.body.username;
   const chatMessage = req.body.chat;

   const message = `${username} : ${chatMessage}`;

   fs.appendFile('message.txt', message + '\n', (err) => {
       if(err) {
           console.log(err);
       }
       console.log('Message saved: ' + message);
       res.redirect('/');
   });
});

//HTML SELLER PAGE
<!DOCTYPE html>
<html>
<head>
    <title>Product List</title>
    <style>
        ul {
            list-style-type: none;
        }
    </style>
</head>
<body>
    <h1>Product List</h1>
    <h2>Electronics</h2>
    <ul id="electronicsList"></ul>
    <h2>Clothing</h2>
    <ul id="clothingList"></ul>
    <h2>Books</h2>
    <ul id="booksList"></ul>

    <script>
        // Function to create a list item for a product
        function createProductListItem(product) {
            const li = document.createElement("li");
            li.innerText = `${product.name} - $${product.price}`;
            return li;
        }

        // Function to display products in the DOM based on category
        function displayProductsByCategory(products) {
            const electronicsList = document.getElementById("electronicsList");
            const clothingList = document.getElementById("clothingList");
            const booksList = document.getElementById("booksList");

            products.forEach((product) => {
                const category = product.category;
                const listItem = createProductListItem(product);

                if (category === "Electronics") {
                    electronicsList.appendChild(listItem);
                } else if (category === "Clothing") {
                    clothingList.appendChild(listItem);
                } else if (category === "Books") {
                    booksList.appendChild(listItem);
                }
            });
        }

        // Make a GET request to fetch products and display them in the DOM
        fetch("/products")
            .then((response) => response.json())
            .then((data) => {
                const products = data.allProducts;
                displayProductsByCategory(products);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    </script>
</body>
</html>


//SELLERS PAGE HTML JS
// Add Event Listener to Submit
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("type").value;

  // If a product name and price is entered
  if (category != "chooseOne" && name.length > 0 && price > 0) {
    const product = {
      name,
      price,
      category,
    };

    try {
      const response = await fetch("/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        showProducts();
        document.getElementById("productForm").reset();
      } else {
        console.log("Failed to ADD Product", data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      showProducts();
    } else {
      console.log(data.err);
    }
  } catch (err) {
    console.log(err);
  }
};

const showProducts = async () => {
  try {
    const response = await fetch("/products");
    const data = await response.json();
    if (response.ok) {
      const products = data.allProducts;
      const electronicsList = document.getElementById("electronicsList");
      const skincareList = document.getElementById("skincareList");
      const foodList = document.getElementById("foodList");
      electronicsList.innerHTML = "";
      skincareList.innerHTML = "";
      foodList.innerHTML = "";

      for (let i = 0; i < products.length; i++) {
        if (products[i].category === "Electronics") {
          electronicsList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        } else if (products[i].category === "SkinCare") {
          skincareList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        } else if (products[i].category === "Food") {
          foodList.innerHTML += `
            <div>
                <span><b>Name:</b> ${products[i].name}</span>
                <span><b>Price:</b> ${products[i].price}</span>
                <button onclick="deleteProduct(${products[i].id})">Delete</button>
            </div>
            `;
        }
      }
    } else {
      console.log(data.err);
    }
  } catch (err) {
    console.log(err);
  }
};

showProducts();


<HTML:5> <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Add Products Page</title>
    <h1>ADD PRODUCTS</h1>
    <link rel="stylesheet" href="css/main.css" />
  </head>

  <body>
    <div class="top">
      <div class="add">
        <main class="main">
          <form id="productForm">
            <label for="name">Product Name</label>
            <input type="text" id="name" placeholder="Enter Product Name" />
            <label for="price">Product Price</label>
            <input type="text" id="price" placeholder="Enter Product Price" />
            <label for="type">Product Category</label>
            <select id="type">
              <option value="chooseOne">Choose one...</option>
              <option value="Electronics">Electronics</option>
              <option value="SkinCare">Skin Care</option>
              <option value="Food">Food</option>
            </select>
            <button type="submit" class="addbutton">Add Product</button>
          </form>
        </main>
      </div>
      <div class="container">
        <div class="column">
          <h2 class="column_title">Electronics</h2>
          <div class="column_list" id="electronicsList"></div>
        </div>

        <div class="column">
          <h2 class="column_title">Skin Care</h2>
          <div class="column_list" id="skincareList"></div>
        </div>

        <div class="column">
          <h2 class="column_title">Food</h2>
          <div class="column_list" id="foodList"></div>
        </div>
      </div>
    </div>
    <script src="js/main.js"></script>
  </body>
</html>
</HTML:5>




// EXPENSE APP SHOW EXPENSES
document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("TRIGGERED");

  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  if (category != "chooseOne" && amount.length > 0 && description.length > 0) {
    const expenseDetails = {
      amount,
      description,
      category,
      userId: localStorage.getItem("id"),
    };

    try {
      //RETRIEVE TOKEN FROM LOCAL STORAGE
      const token = localStorage.getItem("token");
      //SEND EXPENSE DATA TO SERVER
      const response = await axios.post("/admin/add-expense", expenseDetails, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        ShowExpense();
        document.getElementById("expenseForm").reset();
      } else {
        console.log("Failed to Add Expense");
      }
    } catch (err) {
      console.log(err);
    }
  }
});

async function removeExpense(expenseId) {
  try {
    const removeExp = document.getElementById(expenseId);
    if (removeExp !== null) {
      removeExp.remove();
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteExpense(expenseId) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/admin/delete-expense/${expenseId}`, {
      headers: {
        Authorization: token,
      },
    });
    removeExpense(expenseId);
    ShowExpense();
  } catch (err) {
    console.log(err);
  }
}

function showPremiumMessage() {
  document.getElementById("rzp-button").style.visibility = "hidden";
  document.getElementById("message").innerHTML = "You are a Premium User";
}

//Show LeaderBoard
function showLeaderBoard() {
  const inputElement = document.createElement("input");
  inputElement.type = "button";
  inputElement.value = "Show LeaderBoard";
  inputElement.onclick = async () => {
    const token = localStorage.getItem("token");
    const LeaderBoardData = await axios.get("/premium/showLeaderBoard", {
      headers: { Authorization: token },
    });

    var LeaderBoardEle = document.getElementById("leaderboard");
    LeaderBoardEle.innerHTML += `<h1> LeaderBoard </h1>`;
    LeaderBoardData.data.forEach((userDetails) => {
      LeaderBoardEle.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses} </li>`;
    });
  };
  document.getElementById("message").appendChild(inputElement);
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}


const ShowExpense = async (page=1) => {
  try {
    const token = localStorage.getItem("token");
    const decodeToken = parseJwt(token);

    const ispremiumuser = decodeToken.ispremiumuser;
    if (ispremiumuser) {
      showPremiumMessage();
      showLeaderBoard();
      downloadFile();
    }

    const response = await fetch(`/admin/expenses?page=${page}`, {
      headers: { Authorization: token },
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      const expenses = data.expenses;
      const list = document.getElementById("expenseList");
      list.innerHTML = "";

      for (let i = 0; i < data.expenses.length; i++) {
        list.innerHTML += `
            <div>
                <span><b>Amount:</b> ${data.expenses[i].amount}</span>
                <span><b>Description:</b> ${data.expenses[i].description}</span>
                <span><b>Category:</b> ${data.expenses[i].category}</span>
                <button onclick = "deleteExpense(${data.expenses[i].id})">Delete</button>
            </div>
            `;
      }
    } else {
      console.log("No Expenses Found");
    }

    updatePagination(data)
  } catch (err) {
    console.log(err);
  }
};

// CREATE PAGINATION
function createPagination(pageNumber, activeClass) {
  return `
    <li class="page-item ${activeClass}">
      <a class="page-link" href="#" onclick="getExpenses(${pageNumber})">${pageNumber}</a>
    </li>
  `;
}

function getExpenses(page) {
  
}

//UPDATE PAGINATION
function updatePagination(data) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if(data.hasPreviousPage) {
    pagination.innerHTML += createPagination(data.previousPage, "");
  }

  for(let i = 1; i <= data.lastPage; i++) {
    const activeClass = i === data.currentPage ? "active" : "";
    pagination.innerHTML += createPagination(i, activeClass);
  }

  if(data.hasNextPage) {
    pagination.innerHTML += createPagination(data.nextPage, "");
  }
}

ShowExpense(1)

document.getElementById("pagination").addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.tagName === "A") {
    const pageNumber = Number(e.target.textContent);
    getExpenses(pageNumber);
  }
})

//DISPLAY DOWNLOAD HISTORY TABLE
function showDownloadHistory() {
  const tableBody = document.getElementById("downloadTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  downloadHistory.forEach((downloadedFile) => {
    const row = tableBody.insertRow();
    const fileUrlCell = row.insertCell();
    const downloadDataCell = row.insertCell();

    fileUrlCell.textContent = downloadedFile.fileUrl;
    downloadDataCell.textContent = new Date(downloadedFile.createdAt).toLocaleString();
  });
}

//FETCH HISTORY FROM SERVER
async function loadDownloadHistory() {
  try{
    const token = localStorage.getItem("token");
    const response = await axios.get("/premium/showPrevDownloads", { headers: { Authorization: token }});

    if(response.status === 200) {
      downloadHistory = response.data.prevDownloads;
      showDownloadHistory();
    } else {
      throw new Error(res.data.message);
    }
  } catch(err) {
    console.log(err);
  }
}

//DOWNLOAD FILE
async function downloadFile() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/premium/downloadReport", {
      headers: { Authorization: token },
    });

    if (response.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.href = response.data.fileUrl;
      downloadLink.download = "myExpense.csv";
      downloadLink.click();

      loadDownloadHistory();
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("showHistory").addEventListener("click", loadDownloadHistory);


//BUY PREMIUM
document.getElementById("rzp-button").onclick = async function (e) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/purchase/premiummembership", {
      headers: { Authorization: token },
    });

    //Payment Handler
    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      // This handler function will handle the success payment
      handler: async function (response) {
        try {
          const res = await axios.post(
            "/purchase/updatestatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          showPremiumMessage();
          alert("You are now a Premium User");
          localStorage.setItem("token", res.data.token);
          showLeaderBoard();
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    };

    //Open Payment Model
    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on("payment.failed", async (response) => {
      try {
        alert("Something went wrong");
      } catch (err) {
        console.group(err);
      }
    });
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
    throw new Error(err);
  }
};

// window.addEventListener("DOMContentLoaded", () => {
//   const page = 1;
//   axios.get(`/admin/expenses?page=${page}`)
//   .then(({ data }) => {
//     ShowExpense(data.expenses);
//     showPagination(data);
//   })
//   .catch((err) => console.log(err));
  
// });


// function showPagination({
//   currentPage,
//   hasNextPage,
//   nextPage,
//   hasPreviousPage,
//   previousPage,
//   lastPage,
// }) {
//   const pagination = document.getElementById("pagination");
//   pagination.innerHTML = '';

//   if(hasPreviousPage) {
//     const btnPrevious = document.createElement("button");
//     btnPrevious.innerHTML = "Previous"
//     btnPrevious.addEventListener('click', () => getExpenses(previousPage))
//     pagination.appendChild(btnPrevious)
//   }

//   const btn1 = document.createElement("button");
//     btn1.innerHTML = `<h3>${currentPage}</h3>`
//     btn1.addEventListener('click', () => getExpenses(currentPage))
//     pagination.appendChild(btn1)

//     if(hasNextPage) {
//     const btnNext = document.createElement("button");
//     btnNext.innerHTML = "Next"
//     btnNext.addEventListener('click', () => getExpenses(nextPage))
//     pagination.appendChild(btnNext)
//     }
// }

// async function getExpenses(page) {
//   try{
//     const response = await axios.get(`/admin/expenses?page=${page}`)
//     const { expenses, ...pageData } = response.data;
//     ShowExpense(expenses);
//     showPagination(pageData);
//   } catch(err) {
//     console.log("Error",err)
//   }
// }


// CHECK IF USER IS PREMIUM AND SHOW RELEVANT CONTENT
function checkPremiumUser() {
  const token = localStorage.getItem("token");
  const decodeToken = parseJwt(token);
  const ispremiumuser = decodeToken.ispremiumuser;

if (ispremiumuser) {
  showPremiumContent();
  showLeaderBoard();
  loadDownloadHistory();
} 
}

checkPremiumUser();

//SHOW PREMIUM MESSAGE
function showPremiumContent() {
  document.getElementById("rzp-button").style.visibility = "hidden";
  document.getElementById("message").innerHTML = "You are a Premium User";
  document.getElementById("download").style.display = "block";
  document.getElementById("leaderboardButtonDiv").style.display = "block";
  document.getElementById("showHistory").style.display = "block";
}


//CSS
styles.css

/* Header title styles */
.header-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background-color: #65beb2c1;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.title-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #002D74;
}

/* Adjust the image size as needed */
.header-title img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Header signup and login styles */
.signup-text,
.login-text {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 3rem;
  padding-top: 2rem;
}

/* Styles for the alert class */
.alert {
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
}

/* Styles for the error-alert class */
.error-alert {
  background-color: #ff0000;
  color: #ffffff;
}

/* Styles for the success-alert class */
.success-alert {
  background-color: #4caf50;
  color: #ffffff;
}

.hidden {
  display: none;
}

/* Styles for the container class */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* Styles for the nameLabel, emailLabel, and passwordLabel classes */
.nameLabel,
.emailLabel,
.passwordLabel {
  margin-bottom: 5px;
}

/* Styles for the form-label class */
.form-label {
  font-weight: bold;
}

/* Styles for the form-input class */
.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Styles for the btn-primary and btn-secondary classes */
.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styles for the btn-primary class */
.btn-primary {
  width: auto;
  text-align: center;
  background-color: #65beb2c1;
  color: #fff;
}

/* Styles for the btn-secondary class */
.btn-secondary {
  background-color: #002D74;
  color: #fff;
}

/* Styles for the forgot-password class */
.forgot-password {
  font-size: 1.2rem;
  color: #002D74;
  text-decoration: none;
  display: inline-block;
}


//UPDATE IN DATABASE
async function updateExpense(expenseId) {
  const updatedAmount = amountInput.value;
  const updatedDescription = descriptionInput.value;
  const updatedCategory = categoryInput.value;
  const updatedAmountType = document.querySelector('input[name="amountType"]:checked').value;

  if(!updatedAmount || !updatedDescription || !updatedCategory) {
    alert("PLEASE FILL IN ALL THE FIELDS");
    return;
  }

  const obj = {
    updatedAmount,
    updatedDescription,
    updatedCategory,
    updatedAmountType
  };
  
  console.log(obj);
  alert("OBJ CREATED");
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.put(`/admin/updateExpense/${expenseId}`, obj, {
      headers :{
        Authorization : token
      }
    });

    alert("PUT REQUEST SENT");

    if(response.status === 200) {
      awakeSuccessAlert();
      amount.value= "";
      description.value = "";
      category.value = "";
      document.querySelector("#addExpenseButton").style.display = "block";
      document.querySelector("#updateExpenseBtn").style.display = "none";
      updateExpenseBtn.removeAttribute("onclick");
      document.getElementById("Success-alert").innerText = "EXPENSE UPDATED SUCCESSFULLY";
    } else {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
    document.querySelector('.error-textMsg').innerText = `SERVER ERROR- ${err}, IN UPDATING DATA. PLEASE REFRESH THE PAGE`;
    document.querySelector('#error-alert').classList.toggle("hidden");
  }

  try {
    const result = await axios.get(`/admin/getExpenseById/${expenseId}`, {
      headers: {
        Authorization: token
      }
    });

    if(result) {
      showExpenses(result.data.updatedUserExpense);
      return;
    } else {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
    window.location.reload();
  }
}


const Razorpay = require("razorpay");
const Order = require("../Models/orders");
const userController = require('./userController');

exports.purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 10000;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      try {
        await req.user.createOrder({ orderid: order.id, status: "PENDING" });
        return res.status(201).json({ order, key_id: rzp.key_id });
      } catch (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const promise = order.update({ paymentid: payment_id, status: "SUCCESSFUL" });
    const promise1 = req.user.update({ ispremiumuser: true });

    Promise.all([promise, promise1]).then(() => {
      const userId = req.user.id;
        return res.status(201).json({ success: true, message: "Transaction Successful", token: userController.generateAccessToken(userId, undefined, true) });
    })
    .catch((err) => {
        throw new Error(err)
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};


//BUY PREMIUM
document.getElementById("buyPremiumBtn").addEventListener("click", async function (e) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/purchase/premiumMembership", {
      headers: {
         Authorization: token 
        },
    });

    //Payment Handler
    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      // This handler function will handle the success payment
      handler: async function (response) {
        try {
          const res = await axios.post(
            "/purchase/updateStatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          premiumUserMsg();
          alert("You are now a Premium User");
          localStorage.setItem("token", res.data.token);
          showLeaderBoard();
          showDownloadsHistory();

        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    };

    //Open Payment Model
    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on("payment.failed", async (response) => {
      try {
        alert(`Alert: ${response.error.description}`);
      } catch (error) {
        console.group(error);
        alert(`PAYMENT FAILED DUE TO ${error.error.description}`);
      }
    });
  } catch (err) {
    console.log(err);
    alert("SOMETHING WENT WRONG. PLEASE TRY AGAIN LATER");
    throw new Error(err);
  }
});
