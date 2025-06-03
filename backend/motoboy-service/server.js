import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from '../database/connection.js';

const app = express();

// Habilita CORS para o frontend
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Conexão com MongoDB Atlas
await connectDB();

// Schema para motoboys
const motoboySchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  telefone: String,
  placaMoto: String,
  CNH: String,
});

const Motoboy = mongoose.model("Motoboy", motoboySchema);

// Rota para cadastrar um motoboy
app.post("/motoboys", async (req, res) => {
  try {
    const dados = req.body;
    const novoMotoboy = new Motoboy(dados);
    await novoMotoboy.save();

    res.send({ message: "Motoboy cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar motoboy" });
  }
});

// Rota para listar todos os motoboys
app.get("/motoboys", async (req, res) => {
  try {
    const motoboys = await Motoboy.find();
    res.send(motoboys);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar motoboys" });
  }
});

// Rota para atualizar um motoboy pelo ID
app.put("/motoboys/:id", async (req, res) => {
  try {
    const motoboyAtualizado = await Motoboy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!motoboyAtualizado) {
      return res.status(404).send({ error: "Motoboy não encontrado" });
    }
    res.send({ message: "Motoboy atualizado", motoboy: motoboyAtualizado });
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar motoboy" });
  }
});

// Rota para deletar um motoboy pelo ID
app.delete("/motoboys/:id", async (req, res) => {
  try {
    const resultado = await Motoboy.findByIdAndDelete(req.params.id);
    if (!resultado) {
      return res.status(404).send({ error: "Motoboy não encontrado" });
    }
    res.send({ message: "Motoboy removido" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao remover motoboy" });
  }
});

app.listen(5000, () => console.log("Motoboy-Service rodando na porta 5000"));
