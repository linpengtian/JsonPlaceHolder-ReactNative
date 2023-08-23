export interface IPost {
    id: number,
    title: string,
    body: string,
    like: boolean,
    userId: number
};


export interface IComment {
    id: number,
    name: string,
    body: string,
    email: string
};


export interface IUser {
    id: number,
    name: string,
    email: string,
};
