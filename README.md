## Introduction

Piano midi is a service that allows you to compose music in real time and also allows you to save your own composition in .midi format. The js-midgen library is used to generate files in MIDI format in Javascript. It also uses mysql to create a database containing the list of users and the list of each composition created for each user.

## How to use

To use the service you need to install npm in the project folder:

`npm install`

Js-Midgen is also required, run:

`npm install js-midgen`

Alfter that, you need to install mysql and create a database called `music_db` with the following tables:

Canzoni

| Field          | Type         | Null | Key | Extra          |
|----------------|--------------|------|-----|----------------|
| ID             | int(11)      | NO   | PRI | auto_increment |
| ID_PROP        | int(11)      | YES  | MUL |                |
| nome           | varchar(255) | YES  |     |                |
| data_creazione | date         | YES  |     |                |
| path           | varchar(255) | YES  |     |                |

table utenti:

| Field    | Type         | Null | Key | Extra          |
|----------|--------------|------|-----|----------------|
| ID       | int(11)      | NO   | PRI | auto_increment |
| email    | varchar(255) | YES  |     |                |
| nickname | varchar(255) | YES  |     |                |
| password | varchar(255) | YES  |     |                |

Aftert that you can use PIANO MIDI running `npm start`
  
### Credit

Antonino Giangreco - @gitHub: Anto-9393 <br>
Danilo Leocata - @gitHub: [khalld](https://github.com/khalld) <br>


University of Catania - Department of Computer Science
