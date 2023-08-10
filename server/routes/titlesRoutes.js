import { pool } from "../connection.js";


export async function handleGetTitles(req, res) {
  try {
    const conn = await pool.getConnection();
    const titles = await conn.query("SELECT DATABASE() AS databaseName");
    const databaseTitle = titles[0].databaseName;

    const tables = await conn.query(
      "SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'"
    );
    const tableTitles = tables.map((table) => Object.values(table)[0]);
    conn.release();
    res.json({ databaseTitle, tableTitles, firstTable: tableTitles[0] });
  } catch (err) {
    console.error(`Error executing query: ${err}`);
    res.status(500).json({ error: `An error occurred while fetching database and table titles: ${err}` });
  }
}