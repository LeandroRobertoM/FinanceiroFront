export interface RegistrationResponseDto {
    isSuccessfulRegistration: boolean;
    errors: string[];
    status: number;
    mensagem: string;
}