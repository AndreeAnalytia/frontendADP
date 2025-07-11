import authAPI from '../app/services/auth.service';
const auth = new authAPI();
export class LoginService {
  constructor() {}

   async checkusernameandpassword(uname: string, pwd: string) {
     try{
      const user=await auth.signin(uname, pwd);
      return {status:true, user};
     } catch(error : any) {
        return {status:false, message:error.response.data.error}; 
    }
    }
}
