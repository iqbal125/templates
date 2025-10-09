import { useAppStore } from './store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function UserProfile() {
    const user = useAppStore((state) => state.user);
    const toggleTheme = useAppStore((state) => state.toggleTheme);

    if (!user) return null;

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            <div className="space-y-4">
                <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-lg">{user.name}</p>
                </div>

                <div>
                    <Label className="text-sm font-medium">User ID</Label>
                    <p className="text-sm text-gray-500 break-all">{user.id}</p>
                </div>

                <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-3">Preferences</h3>

                    <div className="space-y-3">
                        <div>
                            <Label className="text-sm font-medium">Theme</Label>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="capitalize">{user.preferences.theme}</span>
                                <Button
                                    onClick={toggleTheme}
                                    variant="outline"
                                    size="sm"
                                >
                                    {user.preferences.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Notifications</Label>
                            <div className="space-y-1 mt-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={user.preferences.notifications.email}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">Email</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={user.preferences.notifications.push}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">Push</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={user.preferences.notifications.sms}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">SMS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
