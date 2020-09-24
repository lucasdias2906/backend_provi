import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserServices';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
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
        } = req.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
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
        });

        // na hora de listar estamos falando para nao trazer a senha

        return res.json(user);
    }
}
