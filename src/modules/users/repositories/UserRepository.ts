import { getRepository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUserRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    public async findById(id: string): Promise<User | undefined> {
        const user = await getRepository(User).findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await getRepository(User).findOne({
            where: { email },
        });

        return user;
    }

    public async findByCpf(cpf: string): Promise<User | undefined> {
        const user = await getRepository(User).findOne({
            where: { cpf },
        });

        return user;
    }

    public async findByToken(token: string): Promise<User | undefined> {
        const user = await getRepository(User).findOne({
            where: { token, active: true },
        });

        return user;
    }

    public async create(userdata: ICreateUserDTO): Promise<User> {
        const user = getRepository(User).create(userdata);
        await getRepository(User).save(user);

        return user;
    }

    public async save(user: ICreateUserDTO): Promise<User> {
        return getRepository(User).save(user);
    }

}

const usersRepository = new UsersRepository();
export default usersRepository;
