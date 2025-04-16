export interface TokenUserDTO {
    id: string,
    avatar?: string,
    fullName: string,
    displayName?: string,
    phone?: string,
    email: string,
    accessToken?: string,
    refreshToken?: string
}