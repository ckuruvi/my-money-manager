var pool = require("../db/connection");

exports.getMonthYearList=function(){
  return query(
    "SELECT  distinct to_char(income_date,'Mon') AS month, to_char(income_date,'YYYY') AS year "+
    "from user_income order by 2 desc,1 asc limit 6;"
  ).then(function(list) {
    return list;
  })
  .catch(function(err) {
    console.log("Error getting month year list", err);
  });
}

exports.getIncomeData=function(userid,month,year){
  return query(
    "SELECT 	to_char(income_date,'Mon') AS month, to_char(income_date,'YYYY') AS year,SUM(income_amount) AS income "+
    "from 	user_income "+
    "where user_id=$1 "+
    " and to_char(income_date,'Mon')=$2 "+
    "and to_char(income_date,'YYYY')=$3 "+
    "group by 2,1;",
    [userid,month,year]
  ).then(function(list) {
    return list;
  })
  .catch(function(err) {
    console.log("Error getting income data", err);
  });
}

exports.getExpenseData=function(userid,month,year){
  return query(
    "SELECT 	to_char(expense_date,'Mon') AS month, to_char(expense_date,'YYYY') AS year,SUM(expense_amount) AS expense "+
    "from 	user_expense "+
    "where user_id=$1 "+
    " and to_char(expense_date,'Mon')=$2 "+
    "and to_char(expense_date,'YYYY')=$3 "+
    "group by 2,1;",
    [userid,month,year]
  ).then(function(list) {
    return list;
  })
  .catch(function(err) {
    console.log("Error getting expense data", err);
  });
}

exports.getInvestmentData=function(userid,month,year){
  return query(
    "SELECT 	to_char(purchase_date,'Mon') AS month, to_char(purchase_date,'YYYY') AS year,SUM(quantity * purchase_price) AS investment "+
    "from 	user_holding "+
    "where user_id=$1 "+
    " and to_char(purchase_date,'Mon')=$2 "+
    "and to_char(purchase_date,'YYYY')=$3 "+
    "group by 2,1;",
    [userid,month,year]
  ).then(function(list) {
    console.log("return investmetn data form month",list);
    return list;
  })
  .catch(function(err) {
    console.log("Error getting investment data", err);
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
//
