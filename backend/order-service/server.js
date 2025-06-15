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

// Schema para pedidos
const orderSchema = new mongoose.Schema({
  orderID: String,
  produto: { nome: String, itens: [String], preco: String },
  quantidade: Number,
  clientName: String,
  deliveryMan: String,
  paymentForm: String,
  price: String,
  status: { type: String, default: "pendente" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Rota para processar um pedido
app.post("/pedidos", async (req, res) => {
  try {
    const pedido = req.body;
    const novoPedido = new Order(pedido);
    await novoPedido.save();

    res.send({ message: "Pedido processado!"});
  } catch (error) {
    res.status(500).send({ error: "Erro ao processar pedido" });
  }
});

// 🔍 Rota para listar todos os pedidos
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Order.find();
    res.send(pedidos);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar pedidos" });
  }
});

// ✏️ Rota para atualizar pedido por ID do documento (_id do MongoDB)
app.put("/pedidos/:id", async (req, res) => {
  try {
    const pedidoAtualizado = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pedidoAtualizado) {
      return res.status(404).send({ error: "Pedido não encontrado" });
    }
    res.send({ message: "Pedido atualizado", pedido: pedidoAtualizado });
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar pedido" });
  }
});

// 🗑️ Rota para deletar pedido por ID do documento (_id do MongoDB)
app.delete("/pedidos/:id", async (req, res) => {
  try {
    const resultado = await Order.findByIdAndDelete(req.params.id);
    if (!resultado) {
      return res.status(404).send({ error: "Pedido não encontrado" });
    }
    res.send({ message: "Pedido removido" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao remover pedido" });
  }
});

app.listen(4000, () => console.log("Order-Service rodando na porta 4000"));