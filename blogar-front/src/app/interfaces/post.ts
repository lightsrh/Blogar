import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    id_sujet: number;
    author: User;
    content: string;
    created: Date;
    updated: Date;
}
