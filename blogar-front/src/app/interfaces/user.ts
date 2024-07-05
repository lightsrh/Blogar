import { AuthModel } from "pocketbase";

export interface User {
    id: string;
    username: string;
    isValid: boolean;
    authModel: AuthModel | null;
    token: string;
}
