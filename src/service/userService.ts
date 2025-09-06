import type { User } from '../util/apiNecessaryInterface';
import { apiService } from './api';


export interface UserStats {
    projectsCount: number;
    achievementsCount: number;
    totalViews: number;
    joinDate: string;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: 'project' | 'achievement' | 'meeting' | 'message';
    status: 'completed' | 'pending' | 'scheduled';
}

class UserService {
    // Mock data for demo
    private mockStats: UserStats = {
        projectsCount: 12,
        achievementsCount: 8,
        totalViews: 2450,
        joinDate: '2024-01-15',
    };

    private mockActivities: Activity[] = [
        {
            id: '1',
            title: 'Project Alpha',
            description: 'Updated project documentation and added new features',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            type: 'project',
            status: 'completed',
        },
        {
            id: '2',
            title: 'Team Meeting',
            description: 'Weekly sync with the development team',
            timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            type: 'meeting',
            status: 'scheduled',
        },
        {
            id: '3',
            title: 'Achievement Unlocked',
            description: 'Completed 10 projects milestone',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            type: 'achievement',
            status: 'completed',
        },
        {
            id: '4',
            title: 'New Message',
            description: 'Received feedback on the latest project submission',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            type: 'message',
            status: 'pending',
        },
    ];

    async getUserStats(userId: string): Promise<UserStats> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.mockStats;
    }

    async getUserActivities(userId: string, limit: number = 10): Promise<Activity[]> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockActivities.slice(0, limit);
    }

    async updateUserProfile(userId: string, profileData: Partial<User>): Promise<User> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, this would make an API call
        // return apiService.put<User>(`/users/${userId}`, profileData);

        // Mock response
        const updatedUser: User = {
            id: userId,
            email: profileData.email || 'user@example.com',
            name: profileData.name || 'Updated User',
            avatar: profileData.avatar,
            createdAt: new Date().toISOString(),
        };

        return updatedUser;
    }

    async uploadAvatar(userId: string, file: File): Promise<string> {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real app, you would upload to a file storage service
        // const formData = new FormData();
        // formData.append('avatar', file);
        // const response = await apiService.post<{url: string}>(`/users/${userId}/avatar`, formData);

        // Mock response - return a placeholder URL
        return `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200`;
    }

    async deleteAccount(userId: string): Promise<void> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app:
        // await apiService.delete(`/users/${userId}`);

        // Clear local storage
        localStorage.clear();
    }
}

export const userService = new UserService();