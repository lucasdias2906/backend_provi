class FormatValidators {
    public async formatcpf(cpf: string): Promise<string> {
        cpf = cpf.toString().replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    public async mBirthDay(dateValue: string): Promise<string> {
        dateValue = dateValue.toString();
        return `${dateValue.substr(0, 2)}/${dateValue.substr(
            2,
            2,
        )}/${dateValue.substr(4, 7)}`;
    }

    public validatorCpf(cpf: string) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf))
            return false;
        let result = true;
        [9, 10].forEach(function (j) {
            let soma = 0;
            let r;
            cpf.split(/(?=)/)
                .splice(0, j)
                .forEach(function (e, i) {
                    soma += parseInt(e) * (j + 2 - (i + 1));
                });
            r = soma % 11;
            r = r < 2 ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) result = false;
        });
        return result;
    }
}

const validators = new FormatValidators();

export default validators;
