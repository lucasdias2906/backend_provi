import IUsersRepository from '../IUserRepository';

import ICreateUserDTO from '../../modules/users/dtos/ICreateUserDTO';

import User from '../../modules/users/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    // vai preocurar um usuari onde o email seja igual ao email q estamos recebendo
    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async findByCpf(cpf: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.cpf === cpf);

        return findUser;
    }

    public async create(userdata: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, userdata);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}
