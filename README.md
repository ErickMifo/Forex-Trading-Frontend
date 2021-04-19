# Module-1-WestPoint-Frontend

A frontend for a Forex Trading Application made with Nextjs and a couple of dependencies such as:

1. Axios to fetch data from my api;
2. Recharts to create a graph to show the variations of the currencies;
3. Socket-io-client to update data in real time;

The project contains 2 main components. 

A Table of past trades and a dashboard to perform mock trades.

![WestPoint Module 2 - Google Chrome 14_04_2021 14_11_36 (2)](https://user-images.githubusercontent.com/65738815/114751589-b7ef4d00-9d2b-11eb-8802-df5caf1ce32f.png)

Theres also a Wallet to check and deposit GBP or USD

![WestPoint Module 2 - Google Chrome 19_04_2021 11_56_40 (2)](https://user-images.githubusercontent.com/65738815/115257483-8220de80-a106-11eb-986c-4c6ddf78dc38.png)

And a Queue system in the Mock trading

![WestPoint Module 2 - Google Chrome 19_04_2021 11_49_44 (2)](https://user-images.githubusercontent.com/65738815/115256499-a7611d00-a105-11eb-8dbc-837faebe56b2.png)



The project has support for i18n pt-br and en-us and most of the function have a self-explanatory name, but i'll quickly go through some of them.

Every useEffect is used to either fetch, update or post data. 
To fetch data its used a function called "getData" and it uses axios to fetch from my database. In some cases socket is used to get it in real time instead.
To post or update data its just used a "instance.post" or "instance.put" and passed where and what to post/update.

Theres some elements that are just visible if some button are clicked. To make it happen I used "useState" and to manage if the element will be visible or not is just a matter if the useState is set to "true" or "false".

A folder on the project called "context" is used to manage the state of the application. Since the application is built through components this "useContext" hook is needed to make them interact with each other.

Finally to install this project, you can just git clone and yarn.

Link to the backend - https://github.com/ErickMifo/module-2-WestPoint-backend

Project made for WestPoint's "Module 2".

Made by Erick Mifo ( https://github.com/ErickMifo ).

