# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : A INDEX route :'/products' [GET]
- Show : A SHOW route :'/product/:id' [GET]
- Create : A CREATE route :'/newProduct [POST]

#### Users
- Index : A INDEX route :'/users' [GET]
- Show : A SHOW route :'/user/:id' [GET]
- Create : A CREATE route :'/createUser' [POST]

#### Orders
- Current Order by user : A SHOW route :'/userCurrentOrders/:id' [GET]
- Index : A INDEX route :'/orders' [GET]
- Show : A SHOW route :'/order/:id' [GET]
- Create : A CREATE route :'/newOrder [POST] *for adding new orders*
- Delete : A DELETE route :'/delete/:id [DELETE] *for deleting a specific order*
- Create : A CREATE route :'/order/:id/products/ [CREATE] *for adding products into order*

#### Services
- Product in orders: A INDEX route :'/products_in_orders'[GET]
- Users in orders: A INDEX route :'/users_In_Orders'[GET]
- Most Expensive 5 products : A INDEX route :'/mostExpensive5' [GET] 

## Data Shapes
#### Products
-  id
- name
- price

Table products(id SERIAL PRIMARY KEY ,name VARCHAR (50),price INTEGER) ;

#### Users
- id
- firstName
- lastName
- password
Table users((id SERIAL PRIMARY KEY,firstName VARCHAR (50),lastName VARCHAR (50),password VARCHAR(100) ))
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

I created 2 tables for the orders data
1- Table orders(id SERIAL PRIMARY KEY , status VARCHAR (50),user_id INTEGER REFERENCES users(id))
*orders table is for checking status and user_id of orders*

2-Table order_products(id SERIAL PRIMARY KEY,order_id INTEGER REFERENCES orders(id),quantity INTEGER,product_id INTEGER REFERENCES products(id)); 
*order_products table is for adding products into orders*
