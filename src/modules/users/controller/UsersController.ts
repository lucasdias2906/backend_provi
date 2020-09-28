import { Request, Response } from 'express';
import CepPromise from 'cep-promise';
import UsersRepository from '../repositories/UserRepository';
// import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserServices';
import validators from '../validators/format';

const compareData = (rawData: string, curentData: string) => {
    if (rawData?.toLocaleLowerCase() === curentData?.toLocaleLowerCase())
        return curentData;

    return rawData;
};

export default class UsersController {
    public async createAddress(req: Request, res: Response): Promise<Response> {
        const { cep, number, complement } = req.body;

        // se existir o cep
        if (cep) {
            try {
                const responseCep = await CepPromise(cep);
                req.body.street = compareData(
                    req.body.street,
                    responseCep.street,
                );
                req.body.city = compareData(req.body.city, responseCep.city);
                req.body.state = compareData(req.body.state, responseCep.state);
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    'next-end-point': 'cep',
                    dataError: error,
                });
            }
        }

        try {
            const user = await new CreateUserService().update({
                cep: req.body.cep,
                street: req.body.street,
                number,
                complement,
                city: req.body.city,
                state: req.body.state,
            });

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    public async createCPF(req: Request, res: Response): Promise<any> {
        // CHECK TOKEN IF OKAY && CPF
        if (validators.validatorCpf(req.body?.data)) {
            // update user with CPF where token is the some req.body.token
            return res.status(201).send({
                success: true,
                'next-end-point': 'full-name',
            });
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'cpf',
        });
    }

    public async createFullName(req: Request, res: Response): Promise<any> {
        // CHECK TOKEN IF OKAY && CPF

        // verificando token

        const user = await UsersRepository.findByToken(req.body.token);
        if (user?.cpf) {
            try {
                if (req.body.data === user.full_name) {
                    await new CreateUserService().update({
                        ...user,
                    });
                }

                await new CreateUserService().create({
                    ...user,
                    full_name: req.body.data,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'birth-date',
                });
            } catch (error) {
                return res.status(400).json({ error });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'cpf',
        });
    }

    public async createUser(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        // verificando token

        if (email && password) {
            try {
                await new CreateUserService().create({
                    email,
                    password,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'cpf',
                });
            } catch (error) {
                console.error('ERRRRRROOOOR=>', error);
            }
        }
        return res.status(404).send({
            success: false,
            message: 'Check E-mail and Password',
        });
    }
}
