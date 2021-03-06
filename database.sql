CREATE DATABASE money_manager;

CREATE TABLE users(
    id serial PRIMARY KEY NOT NULL,
    username varchar(50) not null unique,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(150) not null
);

CREATE TABLE income_category(
    id serial PRIMARY KEY NOT NULL,
    income_category_name varchar(100)
);

CREATE TABLE user_income(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id integer REFERENCES users,
    income_category_id  integer REFERENCES income_category,
    income_amount  numeric(8,2),
    income_desc varchar(150),
    income_date  date
);

CREATE TABLE expense_category(
    id serial PRIMARY KEY NOT NULL,
    expense_category_name varchar(100)
);

CREATE TABLE user_expense(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id integer REFERENCES users,
    expense_category_id  integer REFERENCES expense_category,
    expense_amount  numeric(8,2),
    expense_desc varchar(150),
    expense_date  date
);

CREATE TABLE user_holding(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id integer REFERENCES users,
    ticker_symbol varchar(20),
    name  varchar(100),
    quantity integer,
    purchase_date  date,
    purchase_price numeric(5,2),
    current_price  numeric(5,2),
    current_profit numeric(5,2)
);


CREATE TABLE user_holding_price(
    id SERIAL PRIMARY KEY NOT NULL,
    user_holding_id  integer REFERENCES user_holding,
    price numeric(5,2),
    price_date  date
);

INSERT INTO income_category(income_category_name)
VALUES('Salary'),('Investments'),('Dividend'),('Interest Income'),('Rental Income'),('Bonus');

INSERT INTO expense_category(expense_category_name)
VALUES('Utilities'),('Healthcare'),('Food & Groceries'),('Personal Care'),('Consumer Debt'),('Entertainment');

SELECT 	to_char(income_date,'Mon') AS month,
		    to_char(income_date,'YY') AS year,
   		  SUM(income_amount) AS amount
from 	user_income
group by 2,1 order by 2 asc,1 desc limit 6;




-- Json Data from https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?api_key=sK64LyybZ5dz3sg37-Ac&start_date=2017-02-21
{"dataset_data":
{"limit":null,"transform":null,"column_index":null,
"column_names":["Date","Open","High","Low","Close","Volume","Ex-Dividend","Split Ratio","Adj. Open","Adj. High","Adj. Low","Adj. Close","Adj. Volume"],
"start_date":"2017-02-21",
"end_date":"2017-02-21",
"frequency":"daily",
"data":[["2017-02-21",30.41,30.59,30.34,30.52,25701371.0,0.0,1.0,30.41,30.59,30.34,30.52,25701371.0]],"collapse":null,"order":null}}
