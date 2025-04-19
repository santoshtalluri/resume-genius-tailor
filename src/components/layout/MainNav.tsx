
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  Briefcase,
  Users,
  Settings
} from 'lucide-react';

const MainNav = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <nav className="flex items-center space-x-6">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn(
            'flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground'
          )
        }
      >
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink
        to="/resumes"
        className={({ isActive }) =>
          cn(
            'flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground'
          )
        }
      >
        <FileText className="h-4 w-4" />
        <span>My Resumes</span>
      </NavLink>
      
      <NavLink
        to="/jobs"
        className={({ isActive }) =>
          cn(
            'flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground'
          )
        }
      >
        <Briefcase className="h-4 w-4" />
        <span>Jobs</span>
      </NavLink>
      
      {isAdmin && (
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
              isActive && 'text-foreground'
            )
          }
        >
          <Users className="h-4 w-4" />
          <span>Users</span>
        </NavLink>
      )}
      
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          cn(
            'flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground'
          )
        }
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default MainNav;
