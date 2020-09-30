import User from '../entities/User';
import UsersRepository from '../repositories/UserRepository';

interface IUserData {
    id?: string;
    full_name?: string;
    first_name?: any;
    last_name?: any;
    email?: string;
    password?: any;
    cpf?: string;
    birthday?: any;
    cep?: string;
    street?: string;
    complement?: string;
    city?: string;
    state?: string;
    phone?: any;
    number_house?: number;
    active?: boolean;
    updated_at?: any;
    amount_requested?: number;
}

class CreateUserService {
    public update(data: IUserData): Promise<User> {
        console.log('entrou no metodo update');
        return UsersRepository.save({
            ...data,
            active: false,
            updated_at: Date(),
        });
    }

    public create(data: IUserData): Promise<User> {
        console.log('entrou no metodo create');

        delete data.id;

        return UsersRepository.create({ ...data, active: true });
    }
}
const createUserService = new CreateUserService();
export default createUserService;
