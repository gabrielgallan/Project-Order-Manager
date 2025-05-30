const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Importa o CORS

const app = express();


// Habilita CORS para localhost:3000 (frontend React)
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Conexão com MongoDB Atlas
const mongoUri = "mongodb+srv://guilhermedravanete0:123@Mudar@cluster0.xjznhg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado no Order-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Schema para pedidos
const orderSchema = new mongoose.Schema({
  orderID: String,
  produto: String,
  quantidade: Number,
  clientName: String,
  deliveryMan: String,
  paymentoForm: String,
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

    console.log("Pedido recebido:", novoPedido);
    res.send({ message: "Pedido processado!", pedido: novoPedido });
  } catch (error) {
    res.status(500).send({ error: "Erro ao processar pedido" });
  }
});

// 🔍 Rota para listar todos os pedidos
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Order.find();
    console.log("Pedidos cadastrados:", pedidos); // Exibe no console
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