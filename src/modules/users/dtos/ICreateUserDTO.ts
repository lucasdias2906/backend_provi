export default interface ICreateUserDTO {
    token?: string;
    full_name?: string;
    id?: string;
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
    active?: boolean;
    number_house?: number;
}
