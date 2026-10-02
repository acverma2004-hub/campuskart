# CampusKart

A small e-commerce website for college students (stationery, books, gadgets and hostel items).
I built it while following a Udemy course on Angular and Spring Boot, and changed the idea,
data and design to make my own version.

## Features
- Product list, filter by category, search by name
- Product details page
- Shopping cart (saved in the browser, so it survives a refresh)
- Checkout that saves the order in the database and gives a tracking number
- Stock goes down after an order, and the server calculates the total itself

## Tech stack
- Backend: Java 17, Spring Boot 3, Spring Data JPA, H2 (or MySQL)
- Frontend: Angular, TypeScript, plain CSS

## How to run

### Backend
```
cd backend
mvn spring-boot:run
```
Runs on http://localhost:8080. Sample products are added on the first run.
Try http://localhost:8080/api/products in the browser.

### Frontend
```
cd frontend
npm install
ng serve
```
Open http://localhost:4200.

## API
| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/products | all products (`?categoryId=1` or `?keyword=pen` to filter) |
| GET | /api/products/{id} | one product |
| GET | /api/categories | all categories |
| POST | /api/orders | place an order |

## Things I want to add later
- Pagination on the product list
- User login
- Order history page
