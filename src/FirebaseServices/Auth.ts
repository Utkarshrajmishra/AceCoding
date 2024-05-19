import { authRef } from "@/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

class Auth{

    async registerUser(name:string,email:string, password:string)
    {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            authRef,
            email,
            password
          );
          return { User: userCredential.user, status: true };
        } catch (error) {
          return { User: error, status: false };
        }
    }
}

const AuthService=new Auth();
export default AuthService;