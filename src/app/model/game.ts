import { Evento } from "./evento";
import { Fighter } from "./fighter";
import { Guide } from "./guide";

export class Game {
    id!: number;
    nome!: string;
    sigla!: string;
    descricao!: string;
    link!: string;
    preco!: number | null;

    fighter!: Fighter[];
    evento!: Evento[];
    guide!: Guide[];

}
