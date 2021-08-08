import "reflect-metadata";
import express from "express";
import { router } from "./routes";

import "./database";

// @types/express
const app = express();

app.use(express.json());

app.use(router);
/**
 * GET => Buscar uma informação
 * POST => Inserir (Criar) uma informação
 * PUT => Alterar uma informação
 * DELETE => Remover um dado
 * PATCH => Alterar uma informação específica
*/
/**
 * Tipos de parâmetros
 * Routes Params => http://localhost:3000/produtos/78347583458345
 * Query Params => http://localhost:3000/produtos?name=teclado
 * 
 * Body Params => {
 *  name: "teclado",
 * "description": "teclado bom"
 * }
 */

// htttp://localhost:3000
app.listen(3000, () => console.log("server is running NlW..."));