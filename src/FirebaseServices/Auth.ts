import { authRef } from "@/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class Auth {
  async registerUser(email: string, password: string) {
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

  async loginUser(email: string, password: string) {
    try {
      const userLoging = await signInWithEmailAndPassword(
        authRef,
        email,
        password
      );
      return { User: userLoging, status: true };
    } catch (error) {
      return { User: error, status: false };
    }
  }
}

const AuthService = new Auth();
export default AuthService;
