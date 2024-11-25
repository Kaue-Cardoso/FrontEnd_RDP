import { Fighter } from "./fighter";
import { Game } from "./game";
import { User } from "./user";

export class Guide {
  id!: number;
  titulo!: string;
  tipo!: string;
  descricao!: string;
  link!: string;
  data_cr!: String;
  likes: number = 0;
  dislikes: number = 0;
  
  fighter!: Fighter;
  game!: Game;
  user!: User;

  constructor() {
  }
}
