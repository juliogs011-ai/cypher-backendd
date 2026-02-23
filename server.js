const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "SUA_ACCESS_TOKEN_AQUI"
});

app.post("/criar-pagamento", async (req, res) => {
  const payment_data = {
    transaction_amount: Number(req.body.valor),
    description: "Compra Cypher Shop",
    payment_method_id: "pix",
    payer: {
      email: "cliente@email.com"
    }
  };

  try {
    const pagamento = await mercadopago.payment.create(payment_data);
    res.json({
      qr_code: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qr_img: pagamento.body.point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
