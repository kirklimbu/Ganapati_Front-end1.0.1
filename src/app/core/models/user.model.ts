export class User {

  username: string;
  password: string;
  role: string;
  token?:string;

  constructor() {
    this.role = '';
  }
}
