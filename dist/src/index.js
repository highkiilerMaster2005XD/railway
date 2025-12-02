import express from "express";
import { prisma } from './lib/prisma.js';
import { join } from "path";
const server = express();
server.use(express.json());
server.use(express.static("public"));
server.get("/", (req, res) => {
    res.sendFile(join(import.meta.dirname, "..", "pages", "index.html"));
});
server.post("/users", async (req, res) => {
    const { email, name } = req.body;
    await prisma.user.create({
        data: {
            name,
            email,
        }
    });
    res.json({ message: "Usuário criado com sucesso!" });
});
server.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
});
