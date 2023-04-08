# SDI Z-Prefix CRUD Application
## Evan Colon

***Semper Supra***


### The Setup

**1. Fork & Clone** 

* Fork this repository in GitHub and clone it locally onto your machine.
	* https://github.com/EvanColon/crud
	* Once cloned:
			* open the repo with VSCode

**2. Set up your Database**

* Open Docker Desktop

* Next, open your preferred terminal **NOTE: be sure the terminal you use to open your back-end is the same terminal you use for your front-end application**

* Run the following command to pull down a Dockerized Postgres image from the cloud `docker pull postgres`

* Next, you will need to create the directories that will house your database data by running this command `mkdir -p $HOME/docker/volumes/postgres`

* Run the following command to start up a Docker Postgres container instance of the image that was pulled `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

* This should populate a PSQL Container ID. Then run the following command `docker exec -it <first 3 characters of the PSQL-Container-ID> bash`

* Run the following command `psql -U postgres`

* When you type in `\l` it will populate a list of databases. You will need to add a database to that list of databases for this application. Run the following command `CREATE DATABASE basehousing;` **NOTE: Don't forget your semicolon! If you do, immediately after you hit enter, add the semi-colon and hit enter again**

* Go to your VSCode and open your terminal

**3. Back-end**

**NOTE: be sure to change directory to the back-end**

* Type `npm install`

* You should see a `knexfile.js` and a `.env` file. If your `.env` file is not there, copy paste the following *CONNECTION_STRING='postgres://USER:PASSWORD@localhost/basehousing'* into a new file named '.env' in the back-end directory. Be sure to replace the USER:PASSWORD with your postgres Username and Password, i.e.(*CONNECTION_STRING='postgres://postgres:docker@localhost/basehousing'*)

* Next, you will need to run the following command `npx knex migrate:latest`

* Once that is complete, run the following command `npx knex seed:run`

* Run `nodemon index.js` to start running your back-end 

**4. Front-end**

**NOTE: be sure to change directory to the front-end**

* Type `npm install` in the front-end directory through the terminal to gain all the dependencies required for this application 

* run `npm start` to start your server 

## How to use the CRUD App

**User Functionality**

> As a user, you will be able to sign up by clicking 'sign up' and create a username and password to login. The session cookie is good for about 10 minutes.

> As a guest user on the homepage, you will be able to see the seeded / created items as well as opt to login to an account for Inventory Manager access.

> After logging in with the credentials you create or one of the seeded accounts you will be transfered to the Inventory Manager.

> The Inventory Manager portal gives the user the ability to create items that will inherit the user's account id number.

> Inventory Manager users can only delete items created by their user account.

> Under the "View All Inventory" tab the Inventory Manager will be able to see items created by all users.

> Under the "Manage My Items" tab the Inventory Manager can see the items associated with their account.

> Under the "Delete Items" tab the Inventory Manager can delete items by Id number as long as they're associated with their account. Id numbers are listed on the top row under the "Manage My Items" tab.

> Under the "Create Items" tab the Inventory Manager can post a new item to the database and see it rendered under the "Manage My Items" tab. You may need to refresh the page to see it.

> The "Edit Items Tab is non-functional, but it's purpose was to submit put requests to edit rows of data.

> All of the text in each of the items can be clicked to edit the value, however the changes are not persistent as I was unable to complete the PUT / PATCH request required to make those changes to the database. 



**Admin Functionality**

> As an admin, you will be able to update and delete housing locations

> As an admin, you will be able to edit military approved moving companies

## Contributions

* Evan Colon - https://github.com/EvanColon




