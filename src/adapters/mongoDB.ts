import { MongoClient } from "mongodb";

// Inicializa el cliente de MongoDB con la URI
const uri = Deno.env.get("MONGO_URI") || "mongodb://localhost:27017/mineria";
const client = new MongoClient(uri);

// Función para inicializar la conexión (opcional si solo necesitas conectar en la inicialización)
export const connectMongo = async () => {
  try {
    await client.connect();
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Exporta la base de datos para uso en los repositorios
export const db = client.db("forum");
