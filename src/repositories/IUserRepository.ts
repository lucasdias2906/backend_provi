import { IUserData } from '../modules/users/services/CreateUserServices';
import User from '../modules/users/entities/User';
import ICreateUserDTO from '../modules/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
    findById(id: string): Promise<User | undefined>;
    findByCpf(cpf: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO | IUserData): Promise<User>;
    save(user: User): Promise<User>;
}
