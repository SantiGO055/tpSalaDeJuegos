import { User } from "../user";

export class Jugador {
    bot: boolean = true;
	score: number = 0;
    usuario: User;
    // constructor(){
    //     this.usuario = new User();
    // }
	updateScore(total: number) {
		this.score += total;
		return this.score;
	}
}
