import mariadb from "mariadb";

export let pool;

export async function connectToDatabase(data) {
    try {
      pool = mariadb.createPool({
        host: data.host,
        user: data.user,
        password: data.password,
        database: data.database,
      });
  
      const conn = await pool.getConnection();
      conn.release();
  
      console.log(`Connected to MariaDB - (${data.database})`);
      return { success: true, message: "Connection successful.", slug: data.database };
    } catch (err) {
      console.error(`Error connecting to MariaDB - (${data.database}): ${err}`);
      throw new Error(
        `Error connecting to database ("${data.database}"). Check your connection credentials and make sure that the Docker container is running.`
      );
    }
  }
  
  export async function disconnectFromDatabase() {
    if (!pool) {
      console.error("Database connection does not exist.");
      throw new Error("Database connection does not exist.");
    }
  
    try {
      await pool.end();
      console.log("Disconnected from MariaDB!");
      return { success: true, message: "Disconnected from the database." };
    } catch (err) {
      console.error(`Error disconnecting from MariaDB: ${err}`);
      throw new Error("Error disconnecting from the database.");
    }
  }

  export async function executeQuery(query) {
    if (!pool) {
      throw new Error("Database connection does not exist.");
    }
  
    try {
      const conn = await pool.getConnection();
      const result = await conn.query(query);
      conn.release();
      return result;
    } catch (err) {
      console.error(`Error executing query: ${err}`);
      throw new Error(`An error occurred while executing the query: ${err}`);
    }
  }