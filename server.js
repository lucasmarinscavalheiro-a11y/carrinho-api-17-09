const express = require("express");
const app = express()
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"))

// banco de dados em memoria array de objeto
const catalogo = [
    {id: 1, nome: "teclado mecanico", preco: 250},
    {id: 2, nome: "mouse gamer", preco: 120},
    {id: 3, nome: "monitor 24pol", preco: 900},
];

// carrinho comeca vazio
const carrinho = [];

//get /catalogo -> mostra o "banco de dados"
app.get("/catalogo", (req, res) => {
    res.json(catalogo);
});

//get carrinho -> mostra o carinho
app.get("/carrinho", (req, res) => {
    res.json(carrinho);
})

//post /carrinho -> adiciona um item do catalogo ao carrinho
app.post("/carrinho", (req, res) => {
    const { id } = req.body;
    const produto = catalogo.find((p) => p.id === Number(id));

    if (!produto) {
        return res.status(404).json({ error: "Produto não existe no catalogo" });
    }
    carrinho.push(produto);

    res.status(201).json(carrinho);
});

app.post("/carrinho/desconto", (req, res) => {
    const { id, percentual } = req.body;
    const item = carrinho.find((p) => p.id === Number(id));

    if (!item) {
        return res.status(404).json({ error: "Item não esta no carrinho" });
    }

    const desconto = Number(percentual) || 0;
    item.preco = Math.round(item.preco * (1 - desconto / 100));

    res.status(200).json(item);
});

app.listen(PORT, () => {
    console.log(`API no ar em http://localhost:${PORT}`);
});
