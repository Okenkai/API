# API
simple API node.js

# Steps to Setup
1. Clone the application

git clone https://github.com/Okenkai/API.git

2. Create database with firebase

generate a Authentication Key, add in the project

2.1 edit the file db.js in the folder config

var serviceAccount = require("../your_authentification_key.json");

3. Run the prompt command

$ npm init
$ npm install express cors firebase-admin --save
$ npm install -g nodemon

4. Run the server

$ nodemon server
The app will start running at http://localhost:8080

Explore Rest APIs

The app defines following CRUD APIs.


Sample Valid JSON Request Bodys

create ship -> /regate/api/v1/ship/
{
	"name": "blackpearl",
  "skipper": "Jack Sparrow"
}
create tracker -> /regate/api/v1/tracker/
{
	"name": "iphone10",
	"tracker_uuid": "198FS81389FYS"
}
Create pairing -> /regate/api/v1/pairing/
{
  "tracker_id": "your_tracker_id",
	"ship_id": "your_ship_id"
}
Create event -> /regate/api/v1/event/
{
  "name": "transate jacqueVabre"
}
Create category -> /regate/api/v1/category/
{
  "name": "IRC"
  "event_id": "your_event_id"
}
Create race -> /regate/api/v1/race/
{
  "name": "Course 1"
  "category_id": "your_category_id"
}

update ship -> /regate/api/v1/ship/:id
{
	"name": "blackpearl",
  "skipper": "Jack Sparrow"
}
update tracker -> /regate/api/v1/tracker/:id
{
	"name": "iphone10",
	"tracker_uuid": "198FS81389FYS"
}
update pairing -> /regate/api/v1/pairing/:id
{
  "tracker_id": "your_tracker_id",
	"ship_id": "your_ship_id"
}
update event -> /regate/api/v1/event/:id
{
  "name": "transate jacqueVabre"
}
update category -> /regate/api/v1/category/:id
{
  "name": "IRC"
  "event_id": "your_event_id"
}
update race -> /regate/api/v1/race/:id
{
  "name": "Course 1"
  "category_id": "your_category_id"
}
