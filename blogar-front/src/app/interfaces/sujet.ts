import { User } from "./user";

export interface Sujet {
    id: number;
    title: string;
    // author: User;
    created: Date;
    updated: Date;
}
