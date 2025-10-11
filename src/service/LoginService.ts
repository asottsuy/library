import { Repository } from "typeorm";
import { User } from "../entity/User";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "l1br4ry";
export class LoginService {
    private repository: Repository<User>;
  
    constructor(repository: Repository<User>) {
      this.repository = repository;
    }
    
    async verificarLogin(email: string, senha: string): Promise<String> {
        let usuario = await this.repository.findOneBy({email: email});
        if(usuario && usuario.senha == senha){            
            let token = sign({
                usuarioId: usuario.id,
                usuarioEmail: usuario.email
            }, SECRET,
                { expiresIn: '1h' }
            );
            return token;            
        }
        throw ({id: 401, msg: "Usuario ou senha invalidos"});    
    }  
    
    async validarToken(token: string): Promise<void> {
        try{
            console.log("Token ", token);
            const payload = verify(token, SECRET);

            if(!payload){
                throw ({id: 401, msg: "Token Invalido"});    
            }
            return;
        } catch (err :any) {
            console.log(err)

            if (err.name === "TokenExpiredError") {
                console.error("Token expirado: ", err.expiredAt);
                throw { id: 401, msg: "Token expirado"};
            }

            console.error("Erro ao validar token: ", err.message)
            throw { id: 401, msg: "Token inválido"};
        }
    }
}
  