export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: string;
    actionUrl?: string;
    icon?: string;
}

class NotificationService {
    private readonly NOTIFICATIONS_KEY = 'notifications';

    // Mock notifications for demo
    private mockNotifications: Notification[] = [
        {
            id: '1',
            title: 'New Achievement Unlocked!',
            message: 'You completed your first project milestone.',
            type: 'success',
            read: false,
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            icon: 'trophy',
        },
        {
            id: '2',
            title: 'Team Meeting Reminder',
            message: 'Your meeting with the design team starts in 30 minutes.',
            type: 'info',
            read: false,
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            icon: 'calendar',
        },
        {
            id: '3',
            title: 'New Message',
            message: 'Sarah sent you a message about the project update.',
            type: 'info',
            read: true,
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            icon: 'message',
        },
        {
            id: '4',
            title: 'Profile Update',
            message: 'Your profile information has been successfully updated.',
            type: 'success',
            read: true,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            icon: 'user',
        },
        {
            id: '5',
            title: 'Welcome!',
            message: 'Welcome to our platform! Get started by exploring the dashboard.',
            type: 'info',
            read: true,
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            icon: 'bell',
        },
    ];

    async getNotifications(): Promise<Notification[]> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        // In a real app, you would fetch from API
        // return apiService.get<Notification[]>('/notifications');

        return this.mockNotifications.sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    }

    async getUnreadCount(): Promise<number> {
        const notifications = await this.getNotifications();
        return notifications.filter(n => !n.read).length;
    }

    async markAsRead(notificationId: string): Promise<void> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));

        // In a real app:
        // await apiService.put(`/notifications/${notificationId}/read`);

        // Update mock data
        const notification = this.mockNotifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
        }
    }

    async markAllAsRead(): Promise<void> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // In a real app:
        // await apiService.put('/notifications/mark-all-read');

        // Update mock data
        this.mockNotifications.forEach(notification => {
            notification.read = true;
        });
    }

    async deleteNotification(notificationId: string): Promise<void> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        // In a real app:
        // await apiService.delete(`/notifications/${notificationId}`);

        // Remove from mock data
        const index = this.mockNotifications.findIndex(n => n.id === notificationId);
        if (index > -1) {
            this.mockNotifications.splice(index, 1);
        }
    }

    async createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));

        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
        };

        // In a real app:
        // return apiService.post<Notification>('/notifications', newNotification);

        this.mockNotifications.unshift(newNotification);
        return newNotification;
    }

    // Real-time notification subscription (would use WebSocket in real app)
    subscribeToNotifications(callback: (notification: Notification) => void): () => void {
        // Simulate receiving notifications every 30 seconds
        const interval = setInterval(() => {
            const randomNotifications = [
                {
                    title: 'New Update Available',
                    message: 'A new version of the app is available for download.',
                    type: 'info' as const,
                    read: false,
                    icon: 'download',
                },
                {
                    title: 'Task Completed',
                    message: 'Your background task has been completed successfully.',
                    type: 'success' as const,
                    read: false,
                    icon: 'check',
                },
                {
                    title: 'Reminder',
                    message: 'Don\'t forget about your meeting at 3 PM today.',
                    type: 'warning' as const,
                    read: false,
                    icon: 'clock',
                },
            ];

            const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];

            this.createNotification(randomNotification).then(callback);
        }, 30000); // Every 30 seconds

        // Return unsubscribe function
        return () => clearInterval(interval);
    }
}

export const notificationService = new NotificationService();