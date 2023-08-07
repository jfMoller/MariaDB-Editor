import { connectToDatabase, disconnectFromDatabase } from "../connection.js";

export async function handleConnect(req, res) {
  const { data } = req.body;
  try {
    const response = await connectToDatabase(data);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function handleDisconnect(req, res) {
  try {
    const response = await disconnectFromDatabase();
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}