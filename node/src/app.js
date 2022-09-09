import express from "express";
import db from "./config/conecta.js";
import routes from './routes/index.js'
import cors from 'cors';


db.on("error",console.log.bind(console,'Erro de conexão'))
db.once("open",() => {
    console.log("Conexão feita com sucesso!")
})

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

routes(app);

export default app