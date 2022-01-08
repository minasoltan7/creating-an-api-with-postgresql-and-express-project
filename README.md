# Udacity_Project_2_Creating_an_API_with_postgres_and_express

## Steps to start the project:-
1-First run *npm install* in project terminal to install all required node_modules for our preoject

2-Create 2 empty database on your device one for development for testing :
*SQL queries to run*:
     1- CREATE DATABASE e_supermarket
     2- CREATE DATABASE e_supermarket_test

  Note : The db_migrations file will be responsible for creating all required tables for our databases  

3-Our Backend is running on Port :3000 and saved in our *.dotenv* file
  Our Databases Host is running on localhost : 127.0.0.1

*NOTE*
As we are using GitHub to submit our project, adding the dotenv file on .gitignore will exclude the file from being committed to our GitHub repo. The best practice always includes the dotenv file in the .gitignore file.

However, to pass this project, the project reviewer will need to review the environment variables. Therefore, I am adding my environment variables here to help the reviewer connect to the database and reach the important variables for testing

## .dotenv 
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DATABASE=e_supermarket
- POSTGRES_DATABASE_TEST=e_supermarket_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=1234
- PORT=3000
- TOKEN_SECRET=my_secret
- BCRYPT_PASSWORD=my_password
- SALT_ROUNDS=10
- ENV=dev

  

