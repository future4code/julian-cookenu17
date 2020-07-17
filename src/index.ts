import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./IdGenerator";
import * as jwt from "jsonwebtoken";
import { UserDatabase } from "./UserDatabase";
import { Authenticator } from "./Authenticator";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response)=>{

  try{
    const userData = 
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, userData.name, userData.email, userData.password);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({id});

    res.status(200).send({token});

  }catch(err){
    res.status(400).send({error: err.message});
  }

});






const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
