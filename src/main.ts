import express from "express";
import postRoutes from "./adapters/routes/PostRoutes.ts";
import { connectMongo } from "./adapters/mongoDB.ts";

const app = express();
app.use(express.json());
app.use("/posts", postRoutes);

await connectMongo();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
