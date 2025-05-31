import express from 'express'
import axios from 'axios'
import mongoose from 'mongoose'
import cors from 'cors'
import { connectDB } from '../database/connection.js'

const app = express();

// Habilita CORS para localhost:3000 (frontend React)
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Conexão com MongoDB Atlas
await connectDB() 

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Rota para cadastrar um usuário
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;

    // Salva o usuário no banco
    const novoUser = new User(usuario);
    await novoUser.save();

    // Notifica o user-service com dados do usuário
    res.status(201).send({ message: 'Usuário cadastrado'});
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota para listar todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar usuários" });
  }
});

// Rota para atualizar usuário por ID
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioAtualizado = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!usuarioAtualizado) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }
    res.send({ message: "Usuário atualizado" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar usuário" });
  }
});

// Rota para deletar usuário por ID
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const resultado = await User.findOneAndDelete({ id: req.params.id });
    if (!resultado) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }
    res.send({ message: "Usuário removido" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao remover usuário" });
  }
});

app.listen(3002, () => console.log("User-Service rodando na porta 3002"));
