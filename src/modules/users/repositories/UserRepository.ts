import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '../../../repositories/IUserRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../models/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        // assim que o repositorio for carregados
        this.ormRepository = getRepository(User);
    }

    // preocurando por id

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    // preocurando por email
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findByCpf(cpf: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { cpf },
        });

        return user;
    }

    public async create(userdata: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userdata);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
