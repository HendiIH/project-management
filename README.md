# Project Management System

A multi-tenant SaaS project management application built with Laravel, Inertia.js, TypeScript, and Tailwind CSS.

## Overview

This is a comprehensive project management platform designed for teams and organizations. It supports multiple tenants (organizations) with role-based access control, allowing different levels of permissions for super admins, admins, managers, and team members.

## Features

### Multi-Tenant Architecture
- **Super Admin Panel**: Manage all tenants/organizations from a central dashboard
- **Tenant Isolation**: Each organization has complete data separation
- **Organization Management**: Create and manage multiple tenant accounts

### Project Management
- **Projects**: Create and manage multiple projects per organization
- **Kanban Board**: Visual task management with drag-and-drop interface
- **Task Tracking**: Assign tasks, set priorities, track status, and due dates
- **Team Collaboration**: Assign team members to projects and tasks

### User Management & RBAC
- **Role-Based Access Control**:
  - `super_admin`: Full system access, manages tenants
  - `admin`: Organization admin, manages projects and members
  - `manager`: Can manage projects and view members
  - `member`: Can view and work on assigned projects/tasks
- **Team Management**: Invite and manage organization members
- **Authentication**: Secure login/logout with Laravel's auth system

### Tech Stack
- **Backend**: Laravel (PHP)
- **Frontend**: Inertia.js with TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MySQL/PostgreSQL with Eloquent ORM
- **UI**: Virtualized lists for performance, responsive design

## Project Structure

```
├── Admin Panel (super_admin only)
│   ├── Dashboard
│   └── Tenant Management
├── Tenant Features (admin, manager, member)
│   ├── Dashboard
│   ├── Projects (List + Kanban view)
│   ├── Tasks
│   └── Members
└── Authentication
    ├── Login/Logout
    └── Profile Management
```

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm
- MySQL or PostgreSQL

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd project_management
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node.js dependencies
```bash
npm install
```

4. Copy environment file
```bash
cp .env.example .env
```

5. Generate application key
```bash
php artisan key:generate
```

6. Configure your database in `.env`

7. Run migrations
```bash
php artisan migrate
```

8. Seed the database (optional)
```bash
php artisan db:seed
```

9. Build assets
```bash
npm run build
# or for development
npm run dev
```

10. Start the server
```bash
php artisan serve
```

## Development Status

See [TODO.md](./TODO.md) for current development status and planned features.
