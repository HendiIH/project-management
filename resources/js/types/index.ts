export interface User {
    id: number;
    name: string;
    email: string;
    team_id: number;
    role: 'super_admin' | 'admin' | 'manager' | 'member';
}

export interface Team {
    id: number;
    name: string;
    type: 'default' | 'tenant';
    is_active: boolean;
    owner_id: number | null;
    users_count?: number;
    projects_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    team_id: number;
    user_id: number;
    name: string;
    description: string | null;
    status: 'active' | 'completed' | 'archived';
    due_date: string | null;
    tasks_count?: number;
    tasks?: Task[];
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: number;
    project_id: number;
    user_id: number | null;
    title: string;
    description: string | null;
    status: 'todo' | 'in_progress' | 'done';
    priority: number;
    user?: User;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
    stats?: {
        total_projects?: number;
        active_projects?: number;
        completed_projects?: number;
        total_tasks?: number;
        total_tenants?: number;
        active_tenants?: number;
        total_users?: number;
    };
    recentProjects?: Project[];
    recentTenants?: Team[];
    projects?: {
        data: Project[];
    };
    project?: Project;
    tenants?: {
        data: Team[];
    };
    members?: {
        data: User[];
    };
    tasks?: {
        data: Task[];
    };
}
