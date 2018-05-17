## Introduction

Piano midi is a service that allows you to compose music in real time and also allows you to save your own composition in .midi format. The js-midgen library is used to generate files in MIDI format in Javascript. It also uses mysql to create a database containing the list of users and the list of each
composition created for each user.

##How to use it

To use the service you need to install npm in the project folder:

npm install

Js-Midgen is also required, run:

npm install js-midgen

Alfter that, you need to install mysql and create a database called 'music_db' with the following records

table canzoni:

+----------------+--------------+------+-----+---------+----------------+<br>
<p>| Field          | Type         | Null | Key | Default | Extra          |<br>
+----------------+--------------+------+-----+---------+----------------+<br>
| ID             | int(11)      | NO   | PRI | NULL    | auto_increment |<br>
| ID_PROP        | int(11)      | YES  | MUL | NULL    |                |<br>
| nome           | varchar(255) | YES  |     | NULL    |                |<br>
| data_creazione | date         | YES  |     | NULL    |                |<br>
| path           | varchar(255) | YES  |     | NULL    |                |<br>
+----------------+--------------+------+-----+---------+----------------+<br>

table utenti:

+----------+--------------+------+-----+---------+----------------+<br>
| Field    | Type         | Null | Key | Default | Extra          |<br>
+----------+--------------+------+-----+---------+----------------+<br>
| ID       | int(11)      | NO   | PRI | NULL    | auto_increment |<br>
| email    | varchar(255) | YES  |     | NULL    |                |<br>
| nickname | varchar(255) | YES  |     | NULL    |                |<br>
| password | varchar(255) | YES  |     | NULL    |                |<br>
+----------+--------------+------+-----+---------+----------------+<br>


Aftert that you can use PIANO MIDI running "npm start" at project folder. After completing all the following steps open your browser and go to http: // localhost: 3000 /

##Credit

Antonino Giangreco - @gitHub: Anto-9393
Danilo Leocata - @gitHub: khalld


University of Catania - Department of computer science
