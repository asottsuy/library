import { Repository } from 'typeorm';
import { User } from '../entity/User';

export class UserService {
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async inserir(user: User): Promise<User> {
    if(!user || !user.email || !user.senha) {
        throw ({id: 400, msg: "Falta dados obrigatorios"});    
    }
    return await this.repository.save(user);
  }

  async listar(): Promise<User[]> {
    return await this.repository.find();
  }
}