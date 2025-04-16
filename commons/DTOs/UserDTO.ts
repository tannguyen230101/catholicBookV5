export interface UserDTO {
    id: string,
    avatar?: string,
    fullName: string,
    displayName?: string,
    phone?: string,
    email: string,
    password: string,
    confirmPassword: string,
    actionCode?: string,
    position?: number
}