# Module-1-WestPoint-Frontend

## Desription

A frontend for a Forex Trading Application with support for i18n pt-br and en-us made with Nextjs where the user have a wallet to do mock trades and check his history. 
Couple of dependencies were used such as:

1. Axios to fetch data from my api;
2. Recharts to create a graph to show the variations of the currencies;
3. Socket-io-client to update data in real time;
4. uuid to create unique ids for each transaction.

## Instalation 


To install this project, you can just git clone and yarn.

And to make it fully work you will also need the backend part.

Link to the backend - https://github.com/ErickMifo/module-2-WestPoint-backend.


## Project Structure

The project contains 2 main components. 

**A Table of past trades and a dashboard to perform mock trades.**



![WestPoint Module 2 - Google Chrome 14_04_2021 14_11_36 (2)](https://user-images.githubusercontent.com/65738815/114751589-b7ef4d00-9d2b-11eb-8802-df5caf1ce32f.png)



**Theres also a Wallet to check and deposit GBP or USD**



![WestPoint Module 2 - Google Chrome 19_04_2021 11_56_40 (2)](https://user-images.githubusercontent.com/65738815/115257483-8220de80-a106-11eb-986c-4c6ddf78dc38.png)



**And a Queue system in the Mock trading**



![WestPoint Module 2 - Google Chrome 19_04_2021 11_49_44 (2)](https://user-images.githubusercontent.com/65738815/115256499-a7611d00-a105-11eb-8dbc-837faebe56b2.png)


## Code Explanation

Most of the function have a self-explanatory name, but i'll quickly go through some of them.

Every useEffect is used to either fetch, update or post data. 
To fetch data its used a function called "getData" and it uses axios to fetch from my database. In some cases socket is used to get it in real time instead.
To post or update data its just used a "instance.post" or "instance.put" and passed where and what to post/update.

A folder on the project called "context" is used to manage the state of the application. Since the application is built through components this "useContext" hook is needed to make them interact with each other.

To make the Queue system I created an empty array and map it. Everytime the buy button is clicked, it it pushes a value inside the array, then the map function displays the "processing screen" and after a couple of seconds I remove the value.


Project made for WestPoint's "Module 2".

Made by Erick Mifo ( https://github.com/ErickMifo ).

