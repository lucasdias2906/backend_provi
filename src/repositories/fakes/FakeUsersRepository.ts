import IUsersRepository from '../IUserRepository';

import ICreateUserDTO from '../../modules/users/dtos/ICreateUserDTO';

import User from '../../modules/users/entities/User';

class FakeUsersRepository implements IUsersRepository {

    dateUpdate = new Date()

    public users: User[] = [
        {
            id: '67',
            full_name: 'Lucas Paulo de Sousa',
            first_name: 'Lucas',
            last_name: 'Sousa',
            email: 'lucas@gmail.com',
            password:
                '$2a$10$9pEUds50VmJgaVGH6AWxseaM8Mp2XiiRwby.foSJxu7kDph3EnT2C',
            cpf: '924.368.121-44',
            birthday: '29/02/2002',
            phone: 23152251499,
            cep: '07790890',
            street: 'Avenida das Palmeiras',
            number_house: 250,
            complement: 'apto 114',
            state: 'São Paulo',
            city: 'Cajamar',
            amount_requested: 1500.20,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

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

    public async update(userdata: ICreateUserDTO): Promise<any> {
        const user = this.findById(userdata.id);

        let i: any;

        for (i in user) {
            if (this.users[i].id === (await user).id) {
                this.users[i] = userdata;
            }
        }

        await this.save({
            ...userdata,
            updated_at: this.dateUpdate,
        })
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

const fakeUsersRepository = new FakeUsersRepository();

export default fakeUsersRepository;

//
