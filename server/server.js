import express from "express";
import mariadb from "mariadb";
import { credentials } from "./credentials.js";

const port = 8082;
const server = express();
server.use(express.json({ limit: "100mb" }));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const pool = mariadb.createPool({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
  connectionLimit: 5
});

server.listen(port, () => {
  pool.getConnection().then(conn => {
    console.log(`Connected to MariaDB!`);
    console.log(`listening in on http://localhost:${port}`);
    conn.release();
  }).catch(err => {
    console.error(`Error connecting to MariaDB: ${err}`);
  });
});


server.get("/example", (req, res) => {
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT * FROM adresser")
        .then(rows => {
          res.json(rows); // Return the retrieved data as JSON response
        })
        .catch(err => {
          console.error(`Error executing query: ${err}`);
          res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
        })
        .finally(() => {
          conn.release();
        });
    });
});