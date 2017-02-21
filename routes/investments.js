var router = require('express').Router();
var Investments = require('../models/investments');
var User = require('../models/user');
var googleFinance = require('google-finance');
var INCOME_CATEGORY=2;


router.get('/searchticker/',function(req,res){
//console.log('inside route get ',req.query.date,req.query.ticker);
          getPriceByTicker(req.query.ticker,req.query.date).then(function(quotes){
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



router.put('/updateprice',function(req,res){

   Investments.getinvestmentList(req.user.id).then(function(investmentList){
     console.log('investmentList',investmentList);
     var date=getLastTradeDate();
     investmentList.forEach(function(obj){
      getPriceByTicker(obj.ticker_symbol,date).then(function(tickerPrice){
        //console.log('*#######*',tickerPrice);
        var purchaseAmt=obj.quantity * parseInt(obj.purchase_price);
        //console.log("purchaseAmt",purchaseAmt,tickerPrice[0].close);
        var currentAmt=obj.quantity * tickerPrice[0].close;
        //console.log("purchaseAmt & currentAmt ::",purchaseAmt,currentAmt);
        var profit=currentAmt - purchaseAmt;
        Investments.setUpdatePrice(obj.id,tickerPrice[0].close,profit);

      });
      console.log("&&&&&&");
     });
     console.log("XXXXXX");
     res.sendStatus(204);
   }).catch(function(err){
      console.log('Error fetching  investmentList');
     res.sendStatus(500);
    });
});


function getLastTradeDate(){
  var dt=new Date();
  var month=dt.getMonth()+1;
  if(month.length=1){
    month='0'+month;
  }
  var year=dt.getFullYear();
  var date=dt.getDate();
  var dayOfWeek=dt.getDay();
  if(dayOfWeek==1){
    date=date-3;
  }else if(dayOfWeek==0){
    date=date-2;
  }else {
    date=date-1;
  }
  return year+'-'+month+'-'+date;
}


function getPriceByTicker(ticker,date){
     return googleFinance.historical({
          symbol: ticker,
          from: date
        }).then( function (quotes) {
              return quotes;
        });
}


module.exports = router;
