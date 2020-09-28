// import { injectable, inject } from 'tsyringe';
// import AppError from '../../../errors/AppError';
import User from '../entities/User';
import encrypted from '../providers/Hash/implementations/BCryptHashProvider';
import UsersRepository from '../repositories/UserRepository';

// cep('05010000').then(console.log);

interface IRequest {
    token?: string;
    id?: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    cpf?: string;
    birthday?: string;
    cep?: string;
    street?: string;
    complement?: string;
    city?: string;
    state?: string;
    phone?: number;
    number_house?: number;
    active?: boolean;
}

class CreateUserService {
    public async update({
        token,
        full_name,
        id,
        first_name,
        last_name,
        email,
        password,
        cpf,
        birthday,
        cep,
        street,
        complement,
        city,
        state,
        phone,
        number_house,
    }: IRequest): Promise<User> {
        // fazendo um hash da senha
        const hashedPassword = await encrypted.generateHash(password);

        const user = await Promise.resolve(
            UsersRepository.save({
                token,
                full_name,
                id,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                cpf,
                birthday,
                cep,
                street,
                complement,
                city,
                state,
                phone,
                number_house,
            }),
        );

        return user;
    }

    public async create({
        token,
        full_name,
        first_name,
        last_name,
        email,
        password,
        cpf,
        birthday,
        id,
        cep,
        street,
        complement,
        city,
        state,
        phone,
        number_house,
    }: IRequest): Promise<User> {
        if (id) {
            await this.update({
                token,
                full_name,
                id,
                first_name,
                last_name,
                email,
                password,
                cpf,
                birthday,
                cep,
                street,
                complement,
                city,
                state,
                phone,
                number_house,
                active: false,
            });
        }
        const user = await Promise.resolve(
            UsersRepository.create({
                token,
                full_name,
                first_name,
                last_name,
                email,
                password,
                cpf,
                birthday,
                cep,
                street,
                complement,
                city,
                state,
                phone,
                number_house,
            }),
        );

        return user;
    }

    // public async createEmail({ email, password }: IRequest): Promise<User> {
    //     // if (id) {
    //     //     await this.update({
    //     //         token,
    //     //         full_name,
    //     //         id,
    //     //         first_name,
    //     //         last_name,
    //     //         email,
    //     //         password,
    //     //         cpf,
    //     //         birthday,
    //     //         cep,
    //     //         street,
    //     //         complement,
    //     //         city,
    //     //         state,
    //     //         phone,
    //     //         number_house,
    //     //         active: false,
    //     //     });

    //     const user = await Promise.resolve(
    //         UsersRepository.createEmail({
    //             email,
    //             password,
    //         }),
    //     );

    //     return user;
    // }
}

export default CreateUserService;
