import "reflect-metadata";
import express from "express";
import { myDataSource } from "./data-source";
//livro
import { LivroService } from "./service/LivroService";
import { LivroController } from "./controller/LivroController";
import { livroRotas } from "./routes/LivroRouter";
import { Livro } from "./entity/Livro";
//autor
import { AutorService} from './service/AutorService';
import { AutorController } from "./controller/AutorController";
import { autorRotas } from "./routes/AutorRouter";
import { Autor } from "./entity/Autor";
//user
import { User } from "./entity/User";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { userRotas } from "./routes/UserRouter";
//login middleware
import { LoginService } from "./service/LoginService";
import { LoginController } from "./controller/LoginController";
import { TokenMiddleware } from "./utils/middleware/TokenMiddleware";
import { loginRotas } from "./routes/LoginRouter";
//emprestimo
import { Emprestimo } from "./entity/Emprestimo";
import { EmprestimoController } from "./controller/EmprestimoController";
import { emprestimoRotas } from "./routes/EmprestimoRouter";
import { EmprestimoService } from "./service/EmprestimoService";


myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());
    
    //Autor
    const autorRepository = myDataSource.getRepository(Autor);
    const autorService = new AutorService(autorRepository);
    const autorController = new AutorController(autorService)
    
    //Livro
    const livroRepository = myDataSource.getRepository(Livro);
    const livroService = new LivroService(livroRepository, autorRepository);
    const livroController = new LivroController(livroService);
    
    //User
    const userRepository = myDataSource.getRepository(User);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    
    //Login
    const loginService = new LoginService(userRepository);
    const loginController = new LoginController(loginService);

    //Emprestimo
    const emprestimoRepository = myDataSource.getRepository(Emprestimo);
    const emprestimoService = new EmprestimoService(emprestimoRepository, userRepository, livroRepository );
    const emprestimoController = new EmprestimoController(emprestimoService);
    
    //Midleware TokenMiddleware
    const tokenMiddleware = new TokenMiddleware(loginService);
    
    //Routes
    // app.use('/api/autor', autorRotas(autorController));
    // app.use('/api/livros', livroRotas(livroController));
    app.use('/api/emprestimo', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), emprestimoRotas(emprestimoController))
    app.use('/api/user', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), userRotas(userController));
    app.use('/api/autor', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), autorRotas(autorController));
    app.use('/api/livros', tokenMiddleware.verificarAcesso.bind(tokenMiddleware), livroRotas(livroController));
    app.use('/api/login', loginRotas(loginController));

    let admin = await userRepository.findOneBy({ email: "admin@exemplo.com" });

    if (!admin) {
      admin = await userRepository.save({
        nome: "Admin",
        email: "admin@exemplo.com",
        senha: "123456",
      })
      console.log("Usuário criado")
    }

    app.listen(port, () => {
      console.log(`Library rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
