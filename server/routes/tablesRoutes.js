import { executeQuery } from "../connection.js";

export async function handleGetTable(req, res) {
  const { data } = req.body;
  const query = `SELECT * FROM ${data.tableName}`;

  try {
    const rows = await executeQuery(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
  }
}

export async function handleGetTableAsDDL(req, res) {
  const { data } = req.body;
  const query = `SHOW CREATE TABLE ${data.databaseName}.${data.tableName};`;

  try {
    const result = await executeQuery(query);
    if (result.length === 0) {
      return res.status(404).json({ error: `Table "${data.tableName}" not found.` });
    }

    const ddl = {tableAsDDL: result[0]['Create Table']};
    res.send(ddl);
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
}