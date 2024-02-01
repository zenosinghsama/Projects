const ExpenseModel = require("../Models/expenseModel");
const UserModel = require("../Models/userModel");
// const sequelize = require("../Util/database");
const mongoose = require('mongoose');

//GET EXPENSES
const getAllExpenses = async (req, res, next) => {
  try{
  const userId = req.user.id;
  const allExpenses = await ExpenseModel.find({  userId  });

  res.status(200).json({ allExpenses: allExpenses })
  } catch(err){
    console.log( 'ERROR IN FETCHING EXPENSES WITH ERROR:', JSON.stringify(err) );
    res.status(500).json({ error: err });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
       return res.status(400).json({ error: 'EXPENSE ID OF UPDATED USER MISSING '});
    }
    const expense = await ExpenseModel.findOne({ _id: id, userId: req.user.id });
    if(!expense) {
      return res.status(404).json({ error: "EXPENSE NOT FOUND" });
    }
   
  } catch(err) {
    console.log("ERROR IN FETCHING EXPENSE BY ID",err);
    res.status(500).json({ err });
  }
};

const updateTotalExpenses = async (user, amount, transaction) => {
  console.log("USER BEFORE UPDATE", user);
  const totalExpense = Number(user.totalExpenses) + Number(amount);
  console.log("TOTAL EXPENSE BEFORE UPDATE", totalExpense);

  await UserModel.findByIdAndUpdate( user.id,
    { totalExpenses: totalExpense }
    // { transaction: transaction }
  );

  console.log("USER AFTER UPDATE", user)
};

const addNewExpense = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, description, category, amountType } = req.body;
  const userId = req.user.id;

  try {
    if (amount == undefined || amount.length === 0) {
      return res.status(400).json({ success: false, message: "SOMETHING IS MISSING" });
    }

    const newExpense = await ExpenseModel.create(
      { amount, description, category, amountType, userId },
      { session: session }
    );

    await updateTotalExpenses(req.user, amount, t);
    
    // await t.commit();
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ newAddedExpense: newExpense });
  } catch (err) {
    console.log("ERROR IN POSTING NEW EXPENSE",err);
    // await t.rollback();
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, error: err });
  }
};



const deleteExpense = async (req, res, next) => {
  // const t = await sequelize.transaction();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "EXPENSE ID NOT FOUND" });
    }

    const expense = await ExpenseModel.findOne({ _id: id, userId: req.user.id });

    if (!expense) {
      // await t.rollback();
      await session.abortTransaction();
      return res.status(404).json({ error: "EXPENSE NOT FOUND " });
    }

    // await expense.destroy({ transaction: t });
    await expense.remove({ session: session });
    await updateTotalExpenses(req.user, -expense.amount );

    // await t.commit();
    await session.commitTransaction();
    session.endSession();

    res.sendStatus(200);
  } catch (err) {
    // await t.rollback();
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

const updateExpense = async (req, res) => {
  try {
    const { amount, description, category, amountType} = req.body;
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ error: 'EXPENSE ID IS MISSING FOR UPDATE'});
    }

      if(!amount || !description ||!category || !amountType) {
        return res.status(400).json({ error: 'ALL FIELDS MANDATORY' });
      }

      const expense = await ExpenseModel.findOneAndUpdate(
        { _id: id , userId: req.user.id },
        { $set :{ amount, description, category, amountType}},
        { new: true }
      );

        if(!expense) {
          return res.status(404).json({ error: "EXPENSE NOT FOUND " });
        }

        // await expense.update({ amount, description, category, amountType });
        
        res.status(200).json({ updatedUserExpense : expense });
    }
    catch(err) {
      console.log('ERROR IN UPDATING EXPENSE', err);
      res.status(500).json({error: err.message})
    }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  deleteExpense,
  updateExpense
};