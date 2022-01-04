export default interface TokenDto {
    grantTpe: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
}
