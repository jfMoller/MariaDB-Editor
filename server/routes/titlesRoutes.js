import { pool } from "../connection.js";


export async function handleGetTitles(req, res) {
  try {
    const conn = await pool.getConnection();
    const dbResult = await conn.query("SELECT DATABASE() AS databaseName");
    const databaseTitle = dbResult[0].databaseName;

    const rows = await conn.query(
      "SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'"
    );
    const tableTitles = rows.map((row) => Object.values(row)[0]);
    conn.release();
    res.json({ databaseTitle, tableTitles, firstTable: tableTitles[0] });
  } catch (err) {
    console.error(`Error executing query: ${err}`);
    res.status(500).json({ error: `An error occurred while fetching table names: ${err}` });
  }
}