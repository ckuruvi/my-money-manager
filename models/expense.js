var pool = require("../db/connection");

exports.getExpenseCategoryList=function(){
  return query(
    "SELECT * FROM  expense_category; "
  ).then(function(list) {
    return list;
  })
.catch(function(err) {
  console.log("Error getting expense category list", err);
});
}

// create new expense
exports.createExpense=function(userid,category,amount,description,dateSelected){
  return query(
    "INSERT INTO user_expense (user_id,expense_category_id,expense_amount,expense_desc,expense_date) "+
    "VALUES ($1, $2, $3, $4,$5) RETURNING *",
    [ userid,category,amount,description,dateSelected ]
  ).then(function(expense) {
    return expense[0];
  })
.catch(function(err) {
  console.log("Error creating expense", err);
});
};

//get expense list
exports.getExpenseList=function(userid){
  return query(
    "SELECT u.id,expense_category_name,expense_amount,expense_desc,expense_date FROM  user_expense u inner join"+
     " expense_category c on u.expense_category_id=c.id and u.user_id=$1 ; ",
     [userid]
  ).then(function(list) {
    return list;
  })
.catch(function(err) {
  console.log("Error getting expense List", err);
});
}

// delete expense
exports.deleteExpense = function(id) {
      return query(
        "DELETE from user_expense where id=$1 RETURNING *",
        [ id ]
      ).then(function(users) {
        return users[0];
      })
    .catch(function(err) {
      console.log("Error deleting  expense", err);
    });
};

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
