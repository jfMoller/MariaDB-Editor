import express from "express";
import { handleConnect, handleDisconnect } from "./routes/connectionRoutes.js";
import { handleGetTableAsSQL } from "./routes/queryRoutes.js";
import { handleGetTitles } from "./routes/titlesRoutes.js";
import { handleGetTable } from "./routes/tablesRoutes.js";
import { handleGetRow, handleEditRow, handleDeleteRow } from "./routes/rowsRoutes.js";

const port = 8082;
const server = express();
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

server.post("/connect", handleConnect);
server.get("/disconnect", handleDisconnect);
server.get("/titles", handleGetTitles);
server.post("/tables", handleGetTable);
server.post("/query", handleGetTableAsSQL);
server.post("/rows", handleGetRow);
server.put("/rows", handleEditRow);
server.delete("/rows", handleDeleteRow);