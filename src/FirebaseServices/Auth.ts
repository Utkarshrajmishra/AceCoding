import { authRef } from "@/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

class Auth{

    async registerUser(email:string, password:string)
    {
        await createUserWithEmailAndPassword(authRef,email,password)
        .then((user)=>{
            if(user) return {User:user,status:true}
        })
        .catch((error)=>{
            return {User:error, status:false};
        })
    }
}

const AuthService=new Auth();
export default AuthService;