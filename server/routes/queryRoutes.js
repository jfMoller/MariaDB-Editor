import { executeQuery } from "../connection.js";

export async function handleGetTableAsSQL(req, res) {
  const { data } = req.body;
  const query = `SHOW CREATE TABLE ${data.databaseName}.${data.tableName};`;

  try {
    const result = await executeQuery(query);
    
    if (result.length === 0) {
      return res.status(404).json({ error: `Table "${data.tableName}" not found.` });
    }

    const createTableStatement = {tableAsSQL: result[0]['Create Table']};
    
    res.send(createTableStatement);
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
}