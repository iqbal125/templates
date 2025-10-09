import { create } from "zustand";
import type { StateCreator } from "zustand";

interface Comment {
    id: string;
    text: string;
    author: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    comments: Comment[];
}

interface Project {
    id: string;
    name: string;
    owner: string;
    settings: {
        visibility: "private" | "public";
        dueDate?: Date;
        tags: string[];
    };
    tasks: Task[];
}

interface UserProfile {
    id: string;
    name: string;
    preferences: {
        theme: "light" | "dark";
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    };
}

// User Slice
interface UserSlice {
    user: UserProfile | null;
    setUser: (user: UserProfile) => void;
    toggleTheme: () => void;
}

const createUserSlice: StateCreator<
    UserSlice & ProjectSlice,
    [],
    [],
    UserSlice
> = (set) => ({
    user: null,

    setUser: (user) => set({ user }),

    toggleTheme: () =>
        set((state) => {
            if (!state.user) return state;
            const newTheme = state.user.preferences.theme === "light" ? "dark" : "light";
            return {
                user: {
                    ...state.user,
                    preferences: {
                        ...state.user.preferences,
                        theme: newTheme,
                    },
                },
            };
        }),
});

// Project Slice
interface ProjectSlice {
    projects: Project[];
    addProject: (name: string) => void;
    addTask: (projectId: string, title: string, description: string) => void;
    toggleTask: (projectId: string, taskId: string) => void;
    addComment: (projectId: string, taskId: string, text: string, author: string) => void;
}

const createProjectSlice: StateCreator<
    UserSlice & ProjectSlice,
    [],
    [],
    ProjectSlice
> = (set) => ({
    projects: [],

    addProject: (name) =>
        set((state) => ({
            projects: [
                ...state.projects,
                {
                    id: crypto.randomUUID(),
                    name,
                    owner: state.user?.id ?? "unknown",
                    settings: { visibility: "private", tags: [] },
                    tasks: [],
                },
            ],
        })),

    addTask: (projectId, title, description) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId
                    ? {
                        ...p,
                        tasks: [
                            ...p.tasks,
                            {
                                id: crypto.randomUUID(),
                                title,
                                description,
                                completed: false,
                                comments: [],
                            },
                        ],
                    }
                    : p
            ),
        })),

    toggleTask: (projectId, taskId) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId
                    ? {
                        ...p,
                        tasks: p.tasks.map((t) =>
                            t.id === taskId ? { ...t, completed: !t.completed } : t
                        ),
                    }
                    : p
            ),
        })),

    addComment: (projectId, taskId, text, author) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === projectId
                    ? {
                        ...p,
                        tasks: p.tasks.map((t) =>
                            t.id === taskId
                                ? {
                                    ...t,
                                    comments: [
                                        ...t.comments,
                                        { id: crypto.randomUUID(), text, author },
                                    ],
                                }
                                : t
                        ),
                    }
                    : p
            ),
        })),
});

// Combined Store
type AppState = UserSlice & ProjectSlice;

export const useAppStore = create<AppState>()((...a) => ({
    ...createUserSlice(...a),
    ...createProjectSlice(...a),
}));
