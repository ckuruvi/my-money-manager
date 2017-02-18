var router = require('express').Router();
var Investments = require('../models/investments');
var User = require('../models/user');
var googleFinance = require('google-finance');
var INCOME_CATEGORY=2;
router.get('/searchticker/:id',function(req,res){
console.log('inside route get ',req.params.id);
  googleFinance.historical({
                symbol: req.params.id,
                from: '2017-02-16'
                //to: '2017-12-13'
              }, function (err, quotes) {
                console.log(quotes);
                res.send(quotes);
              });
        });


// create new investment
router.post('/', function(req, res){
  console.log('inside routes > investment post > req.user.id :: ',req.user.id);
  Investments.createInvestment(req.user.id,req.body.ticker,req.body.name, req.body.quantity,
      req.body.price,req.body.price,req.body.purchasedate,0)
    .then(function(investment){
      console.log('Created new investment');
      res.sendStatus(201);
    }).catch(function(err){
    console.log('Error creating investment');
    res.sendStatus(500);
  });
});



router.get('/',function(req,res){
   Investments.getinvestmentList(req.user.id).then(function(investmentList){
     console.log('investmentList',investmentList);
     res.send(investmentList);
   }).catch(function(err){
      console.log('Error fetching  investmentList');
     res.sendStatus(500);
    });
});

router.put('/',function(req,res){
  console.log(req.user.id, req.body,new Date());
    var income=req.body.quantity * req.body.current_price;
      //userid,category,amount,description,dateSelected
      User.createIncome(req.user.id,INCOME_CATEGORY,income,req.body.name,new Date()).then(function(){
        if(req.body.quantity==req.body.old_quantity){
          Investments.deleteInvestment(req.body.id).then(function(){
            res.sendStatus(204);
          })
        }else {
          Investments.updateInvestment(req.body.id,req.body.old_quantity-req.body.quantity).then(function(){
            res.sendStatus(204);
          })
        }
      }).catch(function(err){
          console.log('Error updating investment sell');
         res.sendStatus(500);
      });
});

module.exports = router;
