
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainNav from './MainNav';
import UserNav from './UserNav';
import { Loader2 } from 'lucide-react';

const DashboardLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center gap-2">
          <h1 className="text-xl font-semibold">Resume Genius Tailor</h1>
        </div>
        <MainNav />
        <UserNav />
      </header>
      
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
      
      <footer className="border-t py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Resume Genius Tailor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
