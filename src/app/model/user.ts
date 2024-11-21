import { Guide } from "./guide";

export class User {
	id!: number;
	username!: string;
	apelido!: string;
	email!: string;
	dc_id!: string;
	senha!: string;
	data_reg!: string;
	role!: string;
    
	event!: Event [];
	guides!: Guide [];

}
