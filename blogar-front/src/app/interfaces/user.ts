import { AuthModel } from "pocketbase";

export interface User {
    username: string;
    isValid: boolean;
    authModel: AuthModel | null;
    token: string;
}
