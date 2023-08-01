import express from "express";
import mariadb from "mariadb";
import { credentials } from "./credentials.js";

const port = 8082;
const server = express();
server.use(express.json());

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

let pool;

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

server.post("/login", (req, res) => {
  const { data } = req.body;

  pool = mariadb.createPool({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database,
  });
  pool.getConnection().then((conn) => {
    conn.release();
    console.log(`Connected to MariaDB!`);
    // You can also send a success response here if needed
    res.json({ success: true, message: "Login successful." });
  }).catch((err) => {
    console.error(`Error connecting to MariaDB: ${err}`);
    res.status(500).json({ message: "Error connecting to the database. Check your login credentials and make sure that the container is running." });
  });
});

server.get("/tables", (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'")
      .then((rows) => {
        const tableTitles = rows.map((row) => Object.values(row)[0]);
        const databaseTitle = credentials.database;
        res.json({ databaseTitle, tableTitles });
      })
      .catch((err) => {
        console.error(`Error executing query: ${err}`);
        res.status(500).json({ error: `An error occurred while fetching table names: ${err}` });
      })
      .finally(() => {
        conn.release();
      });
  });
});

server.post("/tables", (req, res) => {
  pool.getConnection().then((conn) => {
    const { data }= req.body;

    conn.query(`SELECT * FROM ${data}`)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(`Error executing query: ${err}`);
        res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
      })
      .finally(() => {
        conn.release();
      });
  }).catch((err) => {
    console.error(`Error getting database connection: ${err}`);
    res.status(500).json({ error: `An error occurred while connecting to the database: ${err}` });
  });
});

server.post("/rows", (req, res) => {
  pool.getConnection().then((conn) => {
    const { data }= req.body;

    conn.query(`SELECT * FROM ${data.tableName} WHERE id = ${data.rowID} LIMIT 1`)
      .then((row) => {
        res.json(row[0]);
      })
      .catch((err) => {
        console.error(`Error executing query: ${err}`);
        res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
      })
      .finally(() => {
        conn.release();
      });
  }).catch((err) => {
    console.error(`Error getting database connection: ${err}`);
    res.status(500).json({ error: `An error occurred while connecting to the database: ${err}` });
  });
});

server.put("/rows/edit", (req, res) => {
  pool.getConnection().then((conn) => {
    const { data } = req.body;
    const { ...updateData } = data.editedData;

    const updateValues = Object.keys(updateData)
    .map((col) => `${col} = ${parseFormat(updateData[col])}`)
    .join(", ");
  
  function parseFormat(value) {
    if (typeof value === 'string') {
      return `'${formatDate(value)}'`;
    } else {
      return formatDate(value);
    }
  }
  
  function formatDate(value) {
    if (value === null) {
      return value;
    }
    const regex = /^(\d{4}-\d{2}-\d{2}).*$/;
    const match = value.toString().match(regex);
    if (match) {
      return match[1];
    } else {
      return value;
    }
  }

    // Use the formatted date in the update query
    conn.query(`UPDATE ${data.tableName} SET ${updateValues} WHERE id = ${data.editedData.id}`)
      .then(() => {
        res.json({ message: "Row updated successfully." });
      })
      .catch((err) => {
        console.error(`Error executing update query: ${err}`);
        res.status(500).json({ error: `An error occurred while updating data: ${err}` });
      })
      .finally(() => {
        conn.release();
      });
  }).catch((err) => {
    console.error(`Error getting database connection: ${err}`);
    res.status(500).json({ error: `An error occurred while connecting to the database: ${err}` });
  });
});

server.delete("/rows/delete", (req, res) => {
  pool.getConnection().then((conn) => {
    const { data } = req.body;

    conn.query(`DELETE FROM ${data.tableName} WHERE id = ${data.rowID} LIMIT 1`)
      .then((result) => {
        // Check if a row was deleted (affectedRows > 0)
        if (result.affectedRows > 0) {
          res.json({ success: true, message: "Row deleted successfully." });
        } else {
          res.json({ success: false, message: "Row not found or not deleted." });
        }
      })
      .catch((err) => {
        console.error(`Error executing query: ${err}`);
        res.status(500).json({ success: false, message: `An error occurred while attempting to delete data: ${err.message}` });
      })
      .finally(() => {
        conn.release();
      });
  }).catch((err) => {
    console.error(`Error getting database connection: ${err}`);
    res.status(500).json({ success: false, message: `An error occurred while connecting to the database: ${err.message}` });
  });
});