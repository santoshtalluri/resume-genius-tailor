
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
    <nav className="flex-1 hidden md:flex items-center gap-6 text-sm">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground font-medium'
          )
        }
        end
      >
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink
        to="/resumes"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground font-medium'
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
            'flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground font-medium'
          )
        }
      >
        <Briefcase className="h-4 w-4" />
        <span>Job Descriptions</span>
      </NavLink>
      
      {isAdmin && (
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
              isActive && 'text-foreground font-medium'
            )
          }
        >
          <Users className="h-4 w-4" />
          <span>User Management</span>
        </NavLink>
      )}
      
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'text-foreground font-medium'
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
