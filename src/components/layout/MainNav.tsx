
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/lib/navigationConfig';

const MainNav = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <nav className="flex items-center space-x-6">
      {navigationItems.map((item) => {
        // Skip admin-only items for non-admin users
        if (item.adminOnly && !isAdmin) return null;
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )
            }
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MainNav;
