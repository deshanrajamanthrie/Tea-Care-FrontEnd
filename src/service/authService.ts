import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../util/apiNecessaryInterface";
import axios from "axios";

class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private readonly BASE_URL = import.meta.env.VITE_API_BASE_URL;
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';
    private readonly USER_KEY = 'user';


    private mockUsers: User[] = [

    ];

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const { data } = await axios.post<AuthResponse>(`${this.BASE_URL}/auth/login`, credentials);
        console.log('data :', data);

        this.setAuthData(data);
        return data;
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const { data } = await axios.post<AuthResponse>(`${this.BASE_URL}/auth/register`, userData);
        this.setAuthData(data);
        return data;
    }

    async logout(): Promise<void> {
        await axios.post(`${this.BASE_URL}/logout`);
        this.clearAuthData();

    }

    async refreshToken(): Promise<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const newToken = `mock-token-${Date.now()}`;
        localStorage.setItem(this.TOKEN_KEY, newToken);

        return newToken;
    }

    async getCurrentUser(): Promise<User | null> {
        const token = this.getToken();
        if (!token) {
            return null;
        }

        const userData = localStorage.getItem(this.USER_KEY);
        if (userData) {
            return JSON.parse(userData);
        }

        return null;
    }

    async updateProfile(userData: Partial<User>): Promise<User> {
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const updatedUser: User = {
            ...currentUser,
            ...userData,
            id: currentUser.id, // Ensure ID doesn't change
        };

        // Update stored user data
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));

        return updatedUser;
    }

    private setAuthData(authResponse: AuthResponse): void {
        localStorage.setItem(this.TOKEN_KEY, authResponse.access_token);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, authResponse.refreshToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    }

    private clearAuthData(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();