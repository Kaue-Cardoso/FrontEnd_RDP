
import { Evento } from "./evento";
import { Guide } from "./guide";

export class User {
    id!: number;
    apelido!: string;
    email!: string;
    dc_id!: string;
    senha!: string;
    data_reg!: string;
    isMod!: boolean;
    isVet!: boolean;

    eventos!: Evento[];
    guide!: Guide[];
}
