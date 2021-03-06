import { Request, Response } from 'express';
import CepPromise from 'cep-promise';
import { verify } from 'jsonwebtoken';
import UsersRepository from '../repositories/UserRepository';

import userService from '../services/CreateUserServices';
import validators from '../validators/format';

import authConfig from '../../../config/auth';


export default class UsersController {
    public async createCPF(req: Request, res: Response): Promise<any> {
        const { sub }: any =  verify(
            req.body.token,
            authConfig.jwt.secret,
            );
        const user = await UsersRepository.findById(sub);
        const cpfRequest = req.body?.data;
        const cpfValidaate = validators.validatorCpf(cpfRequest);

        if (!cpfValidaate) {
            return res.status(404).send({
                success: false,
                message: 'Check CPF',
            });
        }

        try {
            if (
                cpfRequest === user?.cpf?.replace(/[^\d]/g, '').trim() ||
                !user?.cpf?.replace(/[^\d]/g, '').trim()
            ) {
                userService.update({
                    ...user,
                    cpf: validators.formatcpf(cpfRequest),
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'full-name',
                });
            }

            userService.create({
                ...user,
                cpf: validators.formatcpf(cpfRequest),
            });

            return res.status(201).send({
                success: true,
                'next-end-point': 'full-name',
            });
        } catch (error) {
            return res.status(404).send({
                success: false,
                'next-end-point': 'cpf',
            });
        }
    }

    public async createFullName(req: Request, res: Response): Promise<any> {
        const { sub }: any = verify(
            req.body.token,
            authConfig.jwt.secret,
        );
        const user = await UsersRepository.findById(sub);
        const full_nameReq = req.body.data;

        const fullNameArray = full_nameReq.split(" ")

        if (user?.cpf) {
            try {
                if (full_nameReq === user.full_name || !user?.full_name) {
                    userService.update({
                        ...user,
                        full_name: full_nameReq,
                        first_name: full_nameReq
                            .split(' ')
                            .slice(0, 1)
                            .join(' '),
                            last_name: fullNameArray.slice(1, fullNameArray.length + 1).join(" "),
                    });
                    return res.status(201).send({
                        success: true,
                        'next-end-point': 'birth-date',
                    });
                }

                await userService.create({
                    ...user,
                    full_name: full_nameReq,
                    first_name: full_nameReq.split(' ').slice(0, 1).join(' '),
                    last_name: fullNameArray.slice(1, fullNameArray.length + 1).join(" "),
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'birth-date',
                });
            } catch (error) {
                return res.status(404).send({
                    success: false,
                    'next-end-point': 'cpf',
                });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'cpf',
        });
    }

    public async createBirthday(req: Request, res: Response): Promise<any> {
        const { sub }: any = await verify(
            req.body.token,
            authConfig.jwt.secret,
        );
        const user = await UsersRepository.findById(sub);
        const birthdayReq = req.body.data;

        const birthday = validators.mBirthDay(birthdayReq)

        const validateBirthday = validators.vBirthDay(birthday)


        if(!validateBirthday){
            return res.status(404).send({
                success: false,
                message: 'Check Birth-date',
            });
        }

        if (user?.full_name) {
            try {
                if (
                    birthdayReq ===
                        user?.birthday?.replace(/['/']/g, '').trim() ||
                    !user.birthday
                ) {
                    userService.update({
                        ...user,
                        birthday,
                    });
                    return res.status(201).send({
                        success: true,
                        'next-end-point': 'phone',
                    });
                }

                userService.create({
                    ...user,
                    birthday,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'phone',
                });
            } catch (error) {
                return res.status(404).send({
                    success: false,
                    'next-end-point': 'full-name',
                });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'full-name',
        });
    }

    public async createPhone(req: Request, res: Response): Promise<any> {
        const { sub }: any = verify(
            req.body.token,
            authConfig.jwt.secret,
        );
        const user = await UsersRepository.findById(sub);
        const phoneReq = req.body.data;

        if (user?.birthday) {
            try {
                if (phoneReq == user.phone || !user?.phone) {
                    userService.update({
                        ...user,
                        phone: phoneReq,
                    });
                    return res.status(201).send({
                        success: true,
                        'next-end-point': 'birth-date',
                    });
                }

                await userService.create({
                    ...user,
                    phone: phoneReq,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'Address',
                });
            } catch (error) {
                return res.status(404).send({
                    success: false,
                    'next-end-point': 'Birth-date',
                });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'Birth-date',
        });
    }

    public async createAddress(req: Request, res: Response): Promise<Response> {
        const { sub }: any = verify(
            req.body.token,
            authConfig.jwt.secret,
        );
        const user = await UsersRepository.findById(sub);
        const {cep} = req.body;


        if (cep) {
            try {
                const responseCep = await CepPromise(cep);
                if(req.body.street !== responseCep.street || req.body.city !== responseCep.city || req.body.state !== responseCep.state){
                    return res.status(400).json({
                        success: false,
                        'next-end-point': 'phone',
                    });
                }

            } catch (error) {
                return error
            }
        }

        if (user?.phone) {
            try {
                if (req.body.cep === user.cep || !user?.cep) {
                    userService.update({
                        ...user,
                        cep: req.body.cep,
                        street: req.body.street,
                        number_house: req.body.number_house,
                        complement: req.body.complement,
                        city: req.body.city,
                        state: req.body.state,
                    });
                    return res.status(201).send({
                        success: true,
                        'next-end-point': 'amount-requested',
                    });
                }

                userService.create({
                    ...user,
                    cep: req.body.cep,
                    street: req.body.street,
                    number_house: req.body.number_house,
                    complement: req.body.complement,
                    city: req.body.city,
                    state: req.body.state,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'Amount-requested',
                });
            } catch (error) {
                return res.status(404).send({
                    success: false,
                    'next-end-point': 'phone',
                });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'phone',
        });
    }

    public async createAmount_requested(
        req: Request,
        res: Response,
    ): Promise<any> {
        const { sub }: any = verify(
            req.body.token,
            authConfig.jwt.secret,
        );
        const amount_requested = req.body.data;
        const user = await UsersRepository.findById(sub);

        const ConvAmountRequest = validators.convertToCent(amount_requested)

        if (user?.birthday) {
            try {
                if (ConvAmountRequest === user.amount_requested || !user?.amount_requested) {
                    userService.update({
                        ...user,
                        amount_requested: ConvAmountRequest,
                    });
                    return res.status(201).send({
                        success: true,
                        'next-end-point': 'birth-date',
                    });
                }

                await userService.create({
                    ...user,
                    amount_requested: ConvAmountRequest,
                });
                return res.status(201).send({
                    success: true,
                    'next-end-point': 'cpf',
                });
            } catch (error) {
                return res.status(404).send({
                    success: false,
                    'next-end-point': 'address',
                });
            }
        }

        return res.status(404).send({
            success: false,
            'next-end-point': 'address',
        });
    }
}
