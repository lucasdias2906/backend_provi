import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';
import User from '../models/User';
import IUsersRepository from '../../../repositories/IUserRepository';
import IHashProvider from '../providers/Hash/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    birthday: string;
    phone: number;
    cep: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
        cpf,
        birthday,
        phone,
        cep,
        street,
        number,
        complement,
        city,
        state,
    }: IRequest): Promise<User> {
        // checando users
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used');
        }

        // checando email
        const checkUserExistsCpf = await this.usersRepository.findByCpf(cpf);

        if (checkUserExistsCpf) {
            throw new AppError('cpf already used');
        }

        // fazendo um hash da senha
        const hashedPassword = await this.HashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            cpf,
            birthday,
            phone,
            cep,
            street,
            number,
            complement,
            city,
            state,
        });

        return user;
    }
}

export default CreateUserService;
