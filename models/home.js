var pool = require("../db/connection");


exports.getIncomeList=function(){
  return query(
    "SELECT 	to_char(income_date,'Mon') AS month, to_char(income_date,'YY') AS year,SUM(income_amount) AS income "+
    "from 	user_income group by 2,1 order by 2 asc,1 desc limit 6;"
  ).then(function(incomelist) {
    return incomelist;
  })
.catch(function(err) {
  console.log("Error getting income  list", err);
});
}

exports.getExpenseList=function(){
  return query(
    "SELECT 	to_char(expense_date,'Mon') AS month, to_char(expense_date,'YY') AS year,SUM(expense_amount) AS expense "+
    "from 	user_expense group by 2,1 order by 2 asc,1 desc limit 6;"
  ).then(function(expenselist) {
    return expenselist;
  })
.catch(function(err) {
  console.log("Error getting expense  list", err);
});
}

exports.getTransactionList=function(){
  return query(
    "select 'expense' as type,expense_desc as desc,expense_amount amount,expense_date as tran_date from user_expense "+
    "union "+
    "select 'income' as type,income_desc as desc,income_amount amount,income_date as tran_date from user_income "+
    "union "+
    "select 'investments' as type, name as desc, quantity * current_price as amount ,purchase_date as tran_date from user_holding "+
    "order by 4 desc limit 5;"
  ).then(function(transactionslist) {
    return transactionslist;
  })
.catch(function(err) {
  console.log("Error getting expense  list", err);
});
}

function query(sqlString, data) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      try {
        if (err) {
          return reject(err);
        }

        client.query(sqlString, data, function(err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });
  });
}
