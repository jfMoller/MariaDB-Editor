import { executeQuery } from "../connection.js";

export async function handleQuery(req, res) {
  const { data } = req.body;
  const query = data.query.replace(/\n/g, ''); //remove linebreaks if present

  try {
    await executeQuery(query);
    res.json({ success: true, message: "Query executed." });
  } catch (err) {
    res.status(500).json({ success: false, message: `An error occurred while attempting to execute a query: ${err.message}` });
  }
}