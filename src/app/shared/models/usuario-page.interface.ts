import { IUsuario } from "./usuario.interface";

export interface IUsuarioPage {
    usuarios: IUsuario[],
    totalElements: number,
    totalPages: number,
}