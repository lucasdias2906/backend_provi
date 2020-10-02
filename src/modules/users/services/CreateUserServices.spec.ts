import { verify } from 'jsonwebtoken';
import CepPromise from 'cep-promise';

import validators from '../validators/format';
import FakeUsersRepository from '../../../repositories/fakes/FakeUsersRepository';
import authConfig from '../../../config/auth';

const tokenReq =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE1MjIwNTksImV4cCI6MTY4NzkyMjA1OSwic3ViIjoiNjcifQ.bag9oiGA3oYJmF4pQe3ac0owV0i7tCzf65p6lpSSmdc';
const { sub }: any = verify(tokenReq, authConfig.jwt.secret);

const compareData = (rawData: string, curentData: string) => {
    if (rawData?.toLocaleLowerCase() === curentData?.toLocaleLowerCase())
        return curentData;

    return rawData;
};


// const FakeUsersRepository.dateUpdate = ;

describe('CreateUser', () => {
    it('Fazendo a criação do cpf', async () => {
        const user = await FakeUsersRepository.findById(sub);
        const cpfRequest = '92436812144';


        expect(validators.validatorCpf(cpfRequest)).toBe(true);



        if (
            cpfRequest === user?.cpf?.replace(/[^\d]/g, '').trim() ||
            !user?.cpf?.replace(/[^\d]/g, '').trim()
            ) {
                console.log("CPF REQUEST", cpfRequest)
                console.log("USER CPF", user?.cpf?.replace(/./g, ''))


            console.log("ENTROU NO UPDATE")
            FakeUsersRepository.update({
                ...user,
                cpf: validators.formatcpf(cpfRequest),
                updated_at: Date(),
            });

            console.log('DEPOIS DO UPDATE', FakeUsersRepository.users );
            expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

            return;

        }

        FakeUsersRepository.create({
            ...user,
            cpf: validators.formatcpf(cpfRequest),
        });

        console.log('DEPOIS DO CREATE', FakeUsersRepository.users );

        expect(FakeUsersRepository.users.length).toBe(2);

        expect(FakeUsersRepository.users[1].cpf.replace(/[^\d]/g, '')).toBe(
            cpfRequest,
            );


        return user;
    });

    it('Fazendo a criação do Full Name', async () => {
        const fullNameRequest = 'Lucas Paulo de Sousa';

        const user = await FakeUsersRepository.findById(sub);

        if (user?.cpf) {
            if (fullNameRequest === user.full_name || !user?.full_name) {
                FakeUsersRepository.update({
                    ...user,
                    full_name: fullNameRequest,
                    first_name: fullNameRequest
                        .split(' ')
                        .slice(0, 1)
                        .join(' '),
                    last_name: fullNameRequest.split(' ').slice(3, 4).join(' '),
                    updated_at: Date(),
                });


                console.log('DEPOIS DO UPDATE', FakeUsersRepository.users );
                expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

                return;
            }
        }

        FakeUsersRepository.create({
            ...user,
            full_name: fullNameRequest,
            first_name: fullNameRequest.split(' ').slice(0, 1).join(' '),
            last_name: fullNameRequest.split(' ').slice(3, 4).join(' '),
        });


        expect(FakeUsersRepository.users.length).toBe(2);
        expect(FakeUsersRepository.users[1].full_name).toBe(fullNameRequest);

        return user;
    });

    it('Fazendo a criação do Birh-date', async () => {
        const birhDayRequest = '27082002';

        const birthday = validators.mBirthDay(birhDayRequest)

        expect(validators.vBirthDay(birthday)).toBe(true);

        const user = await FakeUsersRepository.findById(sub);

        if (user?.full_name) {
            if (
                birhDayRequest ===
                    user?.birthday?.replace(/['/']/g, '').trim() ||
                !user?.birthday?.replace(/['/']/g, '').trim().trim()
            ) {
                FakeUsersRepository.update({
                    ...user,
                    birthday: validators.mBirthDay(birhDayRequest),
                    updated_at: Date(),
                });

                console.log('DEPOIS DO UPDATE', FakeUsersRepository.users );

                expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

                return;
            }

            FakeUsersRepository.create({
                ...user,
                birthday: validators.mBirthDay(birhDayRequest),
            });
        }

        console.log('DEPOIS DO CREATE', FakeUsersRepository.users );


        expect(FakeUsersRepository.users.length).toBe(2);
        expect(
            FakeUsersRepository.users[1].birthday.replace(/[^\d]/g, ''),
        ).toBe(birhDayRequest);

        return user;
    });

    it('Fazendo a criação do Phone', async () => {
        const phoneReq = 23152251499;

        const user = await FakeUsersRepository.findById(sub);

        console.log(phoneReq, user.phone)

        console.log('ANTES DO CREATE', user);
        if (user?.birthday) {
            if (phoneReq === user.phone || !user?.phone) {
                FakeUsersRepository.update({
                    ...user,
                    phone: phoneReq,
                    updated_at: Date(),
                });

            console.log('DEPOIS DO UPDATE', FakeUsersRepository.users );

                expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

                return;
            }

            console.log("entrou no create")
            FakeUsersRepository.create({
                ...user,
                phone: phoneReq,
            });
        }

        console.log('DEPOIS DO CREATE', FakeUsersRepository.users );
        expect(FakeUsersRepository.users.length).toBe(2);
        expect(FakeUsersRepository.users[1].phone).toBe(phoneReq);

        return user;
    });

    it('Fazendo a criação do Address', async () => {
        const user = await FakeUsersRepository.findById(sub);

        const cepReq = '64215900';
        let streetReq = 'Rua Franklin Veras 120';
        let cityReq = 'Parnaíba';
        let stateReq = 'Piauí';
        const numberHouseReq = 250;
        const complementReq = 'Casa 2';

        if (cepReq) {
            const responseCep = await CepPromise(cepReq);

            streetReq = compareData(streetReq, responseCep.street);
            cityReq = compareData(cityReq, responseCep.city);
            stateReq = compareData(stateReq, responseCep.state);
        }

        if (user?.phone) {
            if (cepReq === user.cep || !user?.cep) {
                console.log("entrou no update")
                FakeUsersRepository.update({
                    ...user,
                    cep: cepReq,
                    street: streetReq,
                    number_house: numberHouseReq,
                    complement: complementReq,
                    city: cityReq,
                    state: stateReq,
                    updated_at: Date(),
                });

                expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

                return;
            }

            console.log("entrou no create")
            FakeUsersRepository.create({
                ...user,
                cep: cepReq,
                street: streetReq,
                number_house: numberHouseReq,
                complement: complementReq,
                city: cityReq,
                state: stateReq,
            });
        }


        console.log('ooooooooooooo', user);
        expect(FakeUsersRepository.users.length).toBe(2);
        expect(FakeUsersRepository.users[1].cep).toBe(cepReq);

        return user;
    });

    it.only('Fazendo a criação do Amount Requested', async () => {
        const amount_requested = 150020;

        const amount_requestedReq = validators.convertToCent(amount_requested)

        const user = await FakeUsersRepository.findById(sub);

        console.log('ANTES DO UPDATE', user);


        if (user?.cep) {
            if (
                amount_requestedReq === user.amount_requested ||
                !user?.amount_requested
            ) {
                FakeUsersRepository.update({
                    ...user,
                    amount_requested: amount_requestedReq,
                    updated_at: Date(),
                });

                console.log("DEPOIS DO CREATE",FakeUsersRepository.users);


                expect(FakeUsersRepository.users[0].updated_at).toBe(FakeUsersRepository.dateUpdate);

                return;
            }

            FakeUsersRepository.create({
                ...user,
                amount_requested: amount_requestedReq,
            });
        }


        expect(FakeUsersRepository.users.length).toBe(2);
        console.log("DEPOIS DO CREATE",FakeUsersRepository.users);
        expect(FakeUsersRepository.users[1].amount_requested).toBe(
            amount_requestedReq,
        );

        return user;
    });
});
