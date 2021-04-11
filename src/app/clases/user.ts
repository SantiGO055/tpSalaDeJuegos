export class User {
    email: string;
    uid: string;
    username: string;
    status?:string;
    constructor(){
        this.email = "";
        this.uid = "";
        this.username = "";
    }
}
