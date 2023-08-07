import { executeQuery } from "../connection.js";

export async function handleGetTable(req, res) {
  const { data } = req.body;
  const query = `SELECT * FROM ${data}`;

  try {
    const rows = await executeQuery(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
  }
}