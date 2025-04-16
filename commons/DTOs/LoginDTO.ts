export interface LoginDTO {
    email: string,
    password: string,
    actionCode?: string,
    rememberMe: boolean,
}