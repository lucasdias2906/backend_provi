export default interface ICreateUserDTO {
    full_name?: string;
    id?: any;
    token?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: any;
    cpf?: string;
    birthday?: string;
    cep?: string;
    street?: string;
    complement?: string;
    city?: string;
    state?: string;
    phone?: any;
    active?: boolean;
    number_house?: number;
    amount_requested?: number;
    updated_at?: any;
}
