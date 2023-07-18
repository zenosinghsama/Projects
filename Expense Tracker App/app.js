const path =  require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const sequelize = require('./Util/database');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/Public/")));
app.use(express.static(path.join(__dirname, "/Views/")))
///Routes
const userRoutes = require('./Routes/userRoutes');
const ExpenseRoutes = require('./Routes/expenseRoutes');
app.use(userRoutes);
app.use(ExpenseRoutes);

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "Views", "signup.html"));
  });

//Server
sequelize
.sync()
.then((result) => {
    app.listen(4000);
})
.catch((err) => {
    console.log(err)
})