import { connectToDatabase, disconnectFromDatabase } from "../connection.js";

export async function handleConnect(req, res) {
  const { data } = req.body;
  try {
    const connection = await connectToDatabase(data);
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function handleDisconnect(req, res) {
  try {
    const disconnection = await disconnectFromDatabase();
    res.json(disconnection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}