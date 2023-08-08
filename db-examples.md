# Database examples
Below you'll find some AI generated example databases to help you get going. If you're using DataGrip, simply create a new database/schema by opening a new query console in your data source, then run one of the SQL snippets from below.

## Example 1: Blog Database

This database example simulates a simple blog system where users can create posts and add comments to those posts.

#### SQL
```bash

-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS blog_db;

-- Use the database
USE blog_db;

-- Create a table to store blog posts
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data into the posts table
INSERT INTO posts (title, content, author) VALUES
  ('Introduction to SQL', 'SQL is a powerful language for managing databases.', 'John Doe'),
  ('Building a Full-Stack App', 'Learn how to build a full-stack web application.', 'Jane Smith'),
  ('Advanced SQL Techniques', 'Master advanced SQL techniques for complex queries.', 'Mike Johnson');

-- Create a table to store comments
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  comment TEXT NOT NULL,
  commenter VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- Insert some sample data into the comments table
INSERT INTO comments (post_id, comment, commenter) VALUES
  (1, 'Great article!', 'User123'),
  (2, 'Looking forward to trying this out.', 'Guest456'),
  (1, 'Thanks for sharing this information.', 'User789');

```

## Example 2: E-commerce Database

This database example represents a simple e-commerce platform with products, categories, and orders.

#### SQL
``` bash

-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS ecommerce_db;

-- Use the database
USE ecommerce_db;

-- Create a table to store product categories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Insert some sample data into the categories table
INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Clothing'),
  ('Books');

-- Create a table to store products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Insert some sample data into the products table
INSERT INTO products (name, price, category_id) VALUES
  ('Laptop', 999.99, 1),
  ('T-Shirt', 19.99, 2),
  ('Java Programming Book', 39.99, 3);

-- Create a table to store orders
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(50) NOT NULL,
  order_date DATE NOT NULL
);

-- Create a table to store order items
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

-- Insert some sample data into the orders and order_items tables
INSERT INTO orders (customer_name, order_date) VALUES
  ('John Doe', '2023-08-01'),
  ('Jane Smith', '2023-08-02');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
  (1, 1, 2),
  (1, 3, 1),
  (2, 2, 3);
  ```
## Example 3: Movie Catalog Database

This database example contains information about movies, their genres, and actors.

#### SQL
```bash
-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS movie_catalog_db;

-- Use the database
USE movie_catalog_db;

-- Create a table to store movie genres
CREATE TABLE genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Insert some sample data into the genres table
INSERT INTO genres (name) VALUES
  ('Action'),
  ('Comedy'),
  ('Drama'),
  ('Science Fiction');

-- Create a table to store movies
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_year INT NOT NULL,
  genre_id INT NOT NULL,
  FOREIGN KEY (genre_id) REFERENCES genres (id)
);

-- Insert some sample data into the movies table
INSERT INTO movies (title, release_year, genre_id) VALUES
  ('The Avengers', 2012, 1),
  ('The Hangover', 2009, 2),
  ('The Shawshank Redemption', 1994, 3),
  ('Inception', 2010, 4);

-- Create a table to store actors
CREATE TABLE actors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

-- Insert some sample data into the actors table
INSERT INTO actors (first_name, last_name) VALUES
  ('Robert', 'Downey Jr.'),
  ('Bradley', 'Cooper'),
  ('Morgan', 'Freeman'),
  ('Leonardo', 'DiCaprio');

-- Create a table to store movie-actor relationships
CREATE TABLE movie_actors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  actor_id INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies (id),
  FOREIGN KEY (actor_id) REFERENCES actors (id)
);

-- Insert some sample data into the movie_actors table
INSERT INTO movie_actors (movie_id, actor_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);
```