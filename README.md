# Employee Tracker Application

## Description
A command-line application built with Node.js, Inquirer, and MySQL for managing a company's employee database. With this application, you can view and manage departments, roles, and employees, helping you organize and plan your business efficiently.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Database](#database)
* [Walkthrough Video](#walkthrough-video)

## Installation
Make sure you have Node.js installed on your machine. You can download it from the official Node.js website: https://nodejs.org

Clone this repository to your local machine or download the source code as a ZIP file.

Open a command prompt or terminal and navigate to the project's directory.

Run the following command to install the required dependencies:

```
npm install inquirer@8.2.4 mysql2 console.table
```

Set up your MySQL database and configure the database credentials in the db.js file.

If you want to pre-populate your database with initial data, execute the seeds.sql file using a MySQL client or command-line tool.

## Usage
Run the following command to start the application:
```
node index.js
```

## Database
This application uses a MySQL database, which has been titled employees_db. The database schema includes three tables:
* **department**
* **role**
* **employee**

## Walkthrough Video
https://drive.google.com/file/d/1mGOlKR3uVMT68dEQ2G99Dfx0s1cQo8hK/view

