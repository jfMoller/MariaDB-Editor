import { executeQuery } from "../connection.js";
import { parseValue } from "../utilities.js";


export async function handleGetRow(req, res) {
  const { data } = req.body;
  const query = `SELECT * FROM ${data.tableName} WHERE id = ${data.rowID} LIMIT 1`;

  try {
    const row = await executeQuery(query);
    res.json(row[0]);
  } catch (err) {
    res.status(500).json({ error: `An error occurred while fetching row data: ${err}` });
  }
}

export async function handleEditRow(req, res) {
  const { data } = req.body;
  const updatedValues = Object.entries(data.editedData)
    .map(([col, value]) => `${col} = ${parseValue(value)}`)
    .join(", ");

  const query = `UPDATE ${data.tableName} SET ${updatedValues} WHERE id = ${data.editedData.id}`;

  try {
    await executeQuery(query);
    res.json({ message: "Row updated successfully." });
  } catch (err) {
    res.status(500).json({ error: `An error occurred while updating row data: ${err}` });
  }
}

export async function handleDeleteRow(req, res) {
  const { data } = req.body;
  const query = `DELETE FROM ${data.tableName} WHERE id = ${data.rowID} LIMIT 1`;

  try {
    const result = await executeQuery(query);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Row deleted successfully." });
    } else {
      res.json({ success: false, message: "Row not found or not deleted." });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `An error occurred while attempting to delete row data: ${err.message}` });
  }
}