import { User } from "./user";

export interface Sujet {
    id: string;
    title: string;
    author: User;
    created: Date;
    updated: Date;
}
