import { User } from "../entity/User";

export class UserRepository {
  private listaUser: User[] = [];
  private static proximoId = 1;

  save(userData: Omit<User, "id">): User {
    const newUser = new User();
        newUser.id = UserRepository.proximoId++;
        newUser.email = userData.email;
        newUser.senha = userData.senha;

    this.listaUser.push(newUser);
    return newUser;
  }
}
