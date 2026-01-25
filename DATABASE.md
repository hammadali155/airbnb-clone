# Database Configuration

## Overview
This project uses MySQL as the database. The database connection is configured using `mysql2` package with connection pooling for better performance.

## Database Details
- **Database Name**: `airbnb_db`
- **Host**: localhost
- **Port**: 3306
- **User**: root

## Tables Created

### 1. `users`
Stores user account information
- id (INT, Primary Key, Auto Increment)
- username (VARCHAR, Unique)
- email (VARCHAR, Unique)
- password (VARCHAR)
- full_name (VARCHAR)
- phone (VARCHAR)
- profile_picture (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### 2. `homes`
Stores property listings
- id (INT, Primary Key, Auto Increment)
- house_name (VARCHAR)
- price (DECIMAL)
- location (VARCHAR)
- rating (DECIMAL)
- photo_url (VARCHAR)
- description (TEXT)
- host (VARCHAR)
- bedrooms (INT)
- bathrooms (INT)
- max_guests (INT)
- user_id (INT, Foreign Key → users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### 3. `bookings`
Stores reservation information
- id (INT, Primary Key, Auto Increment)
- home_id (INT, Foreign Key → homes)
- user_id (INT, Foreign Key → users)
- check_in (DATE)
- check_out (DATE)
- guests (INT)
- total_price (DECIMAL)
- status (ENUM: 'pending', 'confirmed', 'cancelled', 'completed')
- payment_method (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### 4. `favourites`
Stores user's favorite homes
- id (INT, Primary Key, Auto Increment)
- user_id (INT, Foreign Key → users)
- home_id (INT, Foreign Key → homes)
- created_at (TIMESTAMP)
- Unique constraint on (user_id, home_id)

### 5. `reviews`
Stores property reviews
- id (INT, Primary Key, Auto Increment)
- home_id (INT, Foreign Key → homes)
- user_id (INT, Foreign Key → users)
- rating (INT, 1-5)
- comment (TEXT)
- created_at (TIMESTAMP)

## Setup Instructions

### First Time Setup
1. Make sure MySQL server is running locally
2. Run the database initialization script:
   ```bash
   node setup-database.js
   ```

This will:
- Create the `airbnb_db` database
- Create all necessary tables
- Set up foreign key relationships

### Configuration
Database credentials are stored in `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1928355aB
DB_NAME=airbnb_db
DB_PORT=3306
```

## Usage in Code

### Importing the database connection:
```javascript
const { pool } = require('./config/database');

// Execute a query
const [rows] = await pool.query('SELECT * FROM homes');
```

### Example Query:
```javascript
const { pool } = require('./config/database');

// Get all homes
async function getAllHomes() {
  const [rows] = await pool.query('SELECT * FROM homes');
  return rows;
}

// Get home by ID
async function getHomeById(id) {
  const [rows] = await pool.query('SELECT * FROM homes WHERE id = ?', [id]);
  return rows[0];
}

// Insert new home
async function createHome(homeData) {
  const { house_name, price, location, rating, photo_url } = homeData;
  const [result] = await pool.query(
    'INSERT INTO homes (house_name, price, location, rating, photo_url) VALUES (?, ?, ?, ?, ?)',
    [house_name, price, location, rating, photo_url]
  );
  return result.insertId;
}
```

## Notes
- The database connection is tested automatically when the server starts
- Connection pooling is enabled for better performance (max 10 connections)
- All tables use foreign keys for data integrity
- Timestamps are automatically managed by MySQL
