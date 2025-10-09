import { useEffect } from 'react';
import { useAppStore } from './store';
import { UserProfile } from './UserProfile';
import { ProjectList } from './ProjectList';

export default function TaskPage() {
    const user = useAppStore((state) => state.user);
    const setUser = useAppStore((state) => state.setUser);

    useEffect(() => {
        // Initialize user if not exists
        if (!user) {
            setUser({
                id: crypto.randomUUID(),
                name: 'John Doe',
                preferences: {
                    theme: 'light',
                    notifications: {
                        email: true,
                        push: false,
                        sms: false,
                    },
                },
            });
        }
    }, [user, setUser]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen transition-colors ${user.preferences.theme === 'dark'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-900'
                }`}
        >
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
                    <p className="text-gray-500">Manage your projects and tasks efficiently</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* User Profile Section */}
                    <div className="md:col-span-1">
                        <UserProfile />
                    </div>

                    {/* Projects Section */}
                    <div className="md:col-span-2">
                        <ProjectList />
                    </div>
                </div>
            </div>
        </div>
    );
}
