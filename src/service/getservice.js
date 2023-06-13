
import { authService, dbService } from "../firebase";
export const logouts = ()=>{
    authService.signOut()
}