import express from "express";
import mariadb from "mariadb";

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

server.post("/connect", (req, res) => {
  const { data } = req.body;

  pool = mariadb.createPool({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database,
  });
  pool.getConnection().then((conn) => {
    conn.release();
    console.log(`Connected to MariaDB - (${data.database})`);
    res.json({ success: true, message: "Connection successful.", slug: data.database });
  }).catch((err) => {
    console.error(`Error connecting to MariaDB - (${data.database}): ${err}`);
    res.status(500).json({ message: `Error connecting to database ("${data.database}"). Check your connection credentials and make sure that the Docker container is running.`});
  });
});

server.get("/disconnect", (req, res) => {
  if (pool) {
    // Close the pool to disconnect from the database
    pool.end().then(() => {
      console.log("Disconnected from MariaDB!");
      res.json({ success: true, message: "Disconnected from the database." });
    }).catch((err) => {
      console.error(`Error disconnecting from MariaDB: ${err}`);
      res.status(500).json({ message: "Error disconnecting from the database." });
    });
  } else {
    // If the pool doesn't exist, respond with an error message
    console.error("Database connection does not exist.");
    res.status(500).json({ message: "Database connection does not exist." });
  }
});

server.get("/tables", (req, res) => {

  pool?.getConnection().then((conn) => {
    // Query to fetch the name of the database
    conn.query("SELECT DATABASE() AS databaseName")
      .then((dbResult) => {
        const databaseTitle = dbResult[0].databaseName;

        // Query to fetch table names
        conn.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'")
          .then((rows) => {
            const tableTitles = rows.map((row) => Object.values(row)[0]);
            res.json({ databaseTitle, tableTitles, firstTable: tableTitles[0] });
          })
          .catch((err) => {
            console.error(`Error executing query: ${err}`);
            res.status(500).json({ error: `An error occurred while fetching table names: ${err}` });
          })
          .finally(() => {
            conn.release();
          });
      })
      .catch((err) => {
        console.error(`Error executing query: ${err}`);
        res.status(500).json({ error: `An error occurred while fetching the database name: ${err}` });
      });
  });
});

server.post("/tables", (req, res) => {
  pool?.getConnection().then((conn) => {
    const { data }= req.body;

    conn.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'")
          .then((rows) => {
            const tableTitles = rows.map((row) => Object.values(row)[0]);
            try { tableTitles.includes(req.data)}
            catch(err) {
              console.error(`Error fetching ${req.data}: ${err}`);
              res.status(500).json({ error: `An error occurred while attempting to fetch ${req.data}: ${err}` });
            }
          })

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
  pool?.getConnection().then((conn) => {
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
  pool?.getConnection().then((conn) => {
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
  pool?.getConnection().then((conn) => {
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