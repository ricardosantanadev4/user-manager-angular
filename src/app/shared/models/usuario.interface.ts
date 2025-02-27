export interface IUsuario {
    id: number;
    dataHoraCadastro: Date;
    usuarioCadastrado: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}