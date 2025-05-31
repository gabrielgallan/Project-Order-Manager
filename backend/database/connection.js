import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Configura o .env para acessar a String de Conexão do Banco
dotenv.config();

//Define a String para conectar com o banco
const mongoUri = process.env.MONGO_URI;

export async function connectDB() {
  mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log("Erro ao conectar no MongoDB", err));
}
