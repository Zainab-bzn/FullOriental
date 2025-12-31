# FullOriental

Oriental Patisserie – Full Stack Web Application
Project Description

Oriental Patisserie is a full-stack web application developed as part of a university course project.
The application simulates an online oriental pastry shop where users can browse cakes, customize a cake based on multiple options, place orders, and complete checkout.
An admin backend is included to view and manage custom cake orders.

The project demonstrates frontend development with React, backend development with Node.js and Express, and relational database design using SQL.

Technologies Used
Frontend

React.js

React Router

Axios

JavaScript (ES6)

CSS

Backend

Node.js

Express.js

RESTful API architecture

Database

MySQL

Relational database design

Primary and foreign key relationships

Application Structure
Oriental/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   ├── Cakes.js
│   │   │   ├── CustomCake.js
│   │   │   ├── Checkout.js
│   │   │   ├── ThankYou.js
│   │   │   └── AdminCustomCakes.js

│   │   ├── components/
│   │   ├── styles/
│   │   └── assets/
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── server.js
│   ├── routes/
│   ├── images/
│   ├── database/
│   └── package.json
│
└── README.md

Main Features
User Side
View cake catalog
View cake details with images
Customize cakes by selecting:
Cake tiers
Fillings
Add-ons
User authentication (login/register required before checkout)
Checkout and order confirmation
Admin Side
View all custom cake orders
Read-only admin dashboard
Display selected cake options and related user information
Database Design

The database follows relational design principles to avoid redundancy and ensure data consistency
Main Tables
users
cakes
tiers
fillings
addons
custom_cakes
orders

Each table uses a primary key.
The custom_cakes table stores foreign keys referencing cakes, tiers, fillings, and add-ons, allowing a flexible and scalable customization system.

How to Run the Project
Backend Setup
cd server
npm start


Server runs on:

http://localhost:8080

Frontend Setup
cd client
npm install
npm start

Frontend runs on:
http://localhost:3000

Project Scope

This project was developed for educational purposes and focuses on:
Full-stack development workflow
Frontend–backend integration
Database design and relationships
User interaction and form handling
Admin dashboard implementation
Author Information

Student Name: Zainab Bazzoun - Rawann 
Course: Web Advanced
Instructor: Ghadir Khalil
