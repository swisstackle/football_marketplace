# football_marketplace

How to deploy

1.	Download the Zip File
2.	Open up Ganache and start a new workspace. After that, add the truffle-cnofig.js in /football_marketplace/football_marketplace-contracts to Ganache:
a.	 
 
3.	In Metamask click ‘import using Secret Recovery Phrase’ and copy the Mnemonic from your Ganache workplace in there.
a.	 
4.	After you restored the account, use the local ganache network.
5.	For security reasons, only one chairperson will be able to register new coaches. You will have to set the address of the chairperson manually in /football_marketplace/football_marketplace-contracts/contracts/Players.sol file. Set the variable “chairperson” to whatever the address of the chairperson should be. 
6.	In a commandline, go to the football_marketplace\football_marketplace-contracts directory and type in the command truffle migrate --network=development
7.	Please doublecheck if the address in “address.txt” in football_marketplace/football_marketplace-app is the same as the contract address for the Players contract which is deployed. If not, just put the correct address in there.
8.	Now that we deployed the contract, we can set up the database. For the database, we used postgresql. It is easier with PGAdmin to administer it. 
9.	I have provided a database scheme (marketplace.sql) that you can use. Here is how you use it to set up the database:
10.	Open PGAdmin and create a database called “marketplace”
11.	After creating the database go to marketplace->Schemas->Tables and right click and select query tool. Paste in the content of “marketplace.sql” and then run it. This will create the table structure for the Dapp. Make sure that your database server is always running during the Dapp execution.
12.	In the /football_marketplace/football_marketplace-app directory there is an .env file where you have to configure the hostname, password and user for postgresql. Make sure to do that.
13.	The Webapp is written with React.JS and therefore is located in football_marketplace/football_marketplace-app/frontend. The database javascript functions are located in football_marketplace/football_marketplace-app/src/js/dbqueries.js.
14.	To make sure that are node dependencies are installed do the following:
a.	Go to football_marketplace and run “npm install”
b.	Go to football_marketplace/football_marketplace-app and run “npm install”
c.	Go to football_marketplace/football_marketplace-app/frontend and run “npm install”
15.	No we are ready to deploy the Dapp.
a.	Go to football_marketplace and run “npm start”
b.	Open up a second terminal and go to football_marketplace/football_marketplace-app/frontend and run “npm start”
c.	Make sure that ports 3000, 3300, 5432, 7545 are open
d.	Now you can go to localhost:3000 to use the app.
e.	Connect with your metamask wallet (using the local ganache network) and try out the app.
f.	To register yourself, go to “Register” and type in your username that you want. Click the button to submit and accept the transaction in metamask. It can take a while to register.
g.	To Create a service, go to services->create a service and type in the necessary information and click on the submit button.
h.	To buy a service, go to store and select a service with the “buy” button.
i.	If you are registered as a coach, you can admit services that users want to offer in the “backend” by clicking on the admit button of the respective service.


# How to deploy with Docker
1.	Install Docker here: Get Docker | Docker Documentation
2.	In /football_marketplace/football_marketplace-app/.env change HOST from “localhost” to “postgres”
3.	For security reasons, only one chairperson (address) will be able to register new coaches. You will have to set the address of the chairperson manually in /football_marketplace/football_marketplace-contracts/contracts/Players.sol file. Set the variable “chairperson” to whatever the address of the chairperson should be. 
4.	In /football_marketplace/football_marketplace-app/frontend/package.json change “proxy” from http://localhost:3300 to "http://football_marketplace:3300"
5.	Make sure that port 3000, 5432, 7545 and 3300 are open.
6.	Go to /football_marketplace and run the command “docker-compose up --force-recreate”
7.	Now, there should be three containers running. One for the database, one for the nodejs webserver and one for the reactjs frontend. The contract will be deployed on ropsten. Keep in mind the the deployment will take longer because of Ropsten.
8.	Now you can go to localhost:3000 and use the app.
