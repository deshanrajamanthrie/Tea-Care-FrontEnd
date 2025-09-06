export interface User {
    id?: number | string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    contactNumber: string,
    language: string
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    contactNumber: string;
    language: string;
    password: string
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refreshToken: string;
}

export interface PromptOption {
    label: string;
    value: string;
}