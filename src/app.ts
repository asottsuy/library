import "reflect-metadata";
import express from "express";
import { myDataSource } from "./data-source";
import { LivroService } from "./service/LivroService";
import { LivroController } from "./controller/LivroController";
import { livroRotas } from "./routes/LivroRouter";
import { Livro } from "./entity/Livro";
import { AutorService} from './service/AutorService';
import { AutorController } from "./controller/AutorController";
import { autorRotas } from "./routes/AutorRouter";
import { Autor } from "./entity/Autor";
import { User } from "./entity/User";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { LoginService } from "./service/LoginService";
import { LoginController } from "./controller/LoginController";
import { TokenMiddleware } from "./utils/middleware/TokenMiddleware";
import { userRotas } from "./routes/UserRouter";
import { loginRotas } from "./routes/LoginRouter";


myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    //Livro
    const livroRepository = myDataSource.getRepository(Livro);
    const livroService = new LivroService(livroRepository);
    const livroController = new LivroController(livroService);

    //Autor
    const autorRepository = myDataSource.getRepository(Autor);
    const autorService = new AutorService(autorRepository);
    const autorController = new AutorController(autorService)
    
    //User
    const userRepository = myDataSource.getRepository(User);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    
    //Login
    const loginService = new LoginService(userRepository);
    const loginController = new LoginController(loginService);
    
    //Midleware TokenMiddleware
    const tokenMiddleware = new TokenMiddleware(loginService);
    
    //Routes
    app.use('/api/autor', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), autorRotas(autorController));
    app.use('/api/livros', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), livroRotas(livroController));
    app.use('/api/user', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), userRotas(userController));
    app.use('/api/login', loginRotas(loginController));

    app.listen(port, () => {
      console.log(`Library rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
