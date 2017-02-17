var router = require('express').Router();
var User = require('../models/expense');


// create new expense
router.post('/', function(req, res){
  console.log('inside routes > expense post > req.user.id :: ',req.user.id);
  User.createExpense(req.user.id,req.body.category,req.body.amount, req.body.description,  req.body.dateSelected)
    .then(function(expense){
      console.log('Created new expense');
      res.sendStatus(201);
    }).catch(function(err){
    console.log('Error creating expense');
    res.sendStatus(500);
  });
});

router.get('/categorylist',function(req,res){
   User.getExpenseCategoryList().then(function(expenseCategoryList){
     console.log('expenseList',expenseCategoryList);
     res.send(expenseCategoryList);
   }).catch(function(err){
      console.log('Error fetching  expenseCategoryList');
     res.sendStatus(500);
    });
});

router.get('/',function(req,res){
   User.getExpenseList(req.user.id).then(function(expenseList){
     console.log('expenseList',expenseList);
     res.send(expenseList);
   }).catch(function(err){
      console.log('Error fetching  expenseList');
     res.sendStatus(500);
    });
});

router.delete('/:id',function(req,res){
   User.deleteExpense(req.params.id).then(function(){
     res.sendStatus(204);
   }).catch(function(err){
      console.log('Error deleting expense form list');
     res.sendStatus(500);
    });
});

module.exports = router;
